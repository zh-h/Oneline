const router = require('express').Router();

const Share = require('../utils/models').Share;
const promiseShareFindOne = Q.nbind(Share.findOne, Share);
const sharerValidate = require('./helper/schema/sharer');
const postValidate = require('./helper/schema/post');

router.param('provider', (req, res, next, provider) => {
    req.olProvider = provider;
    next();
});
router.param('id', (req, res, next, id) => {
    req.olId = id;
    next();
});

/**
 * Store Shared Post
 *
 */
router.post('/:provider/:id', require('../utils/middlewares'), (req, res, next) => {
    const { sharer, post } = req.body;

    if (!sharer || !post) {
        next({ statusCode: 400, msg: 'sharer & post is required' });
        return;
    }

    const provider = req.olProvider;
    const id = provider + req.olId;

    Object.assign(sharer, { shared_at: Date.now() });
    Object.assign(post, { detail: true, avatarless: false });

    if (post.quote) { post.quote.detail = true; }

    /**
     * Valid
     *
     */
    if (req.olPassports[provider] !== sharer.uid || sharerValidate.validate(sharer).error) {
        next({ statusCode: 400, msg: 'invalid sharer' });
        return;
    }
    if (postValidate.validate(post).error) {
        next({ statusCode: 400, msg: 'invalid post' });
        return;
    }

    promiseShareFindOne({ id })
    .then(found => {
        if (found) {
            // Update
            const newSharers = (
                found.sharers
                .filter(s => s.screen_name !== sharer.screen_name)
                .concat(sharer)
            );
            Object.assign(found, {
                sharers: newSharers,
                data   : post,
            });
            found.save(err => {
                if (err) {
                    next({ statusCode: 500 });
                } else {
                    res.json({ id });
                }
            });
        } else {
            // Create
            const share = new Share({
                id,
                sharers  : [sharer],
                viewCount: 0,
                data     : post,
            });
            share.save(err => {
                if (err) {
                    next({ statusCode: 500 });
                } else {
                    res.json({ id });
                }
            });
        }
    }, err => next({ statusCode: 500 }));
});

/**
 * Read Shared Post
 *
 */
router.get('/:provider/:id', (req, res, next) => {
    const id = req.olProvider + req.olId;
    const UA = req.headers['user-agent'].toLowerCase();
    const isAndroidWechat = /micromessenger/.test(UA) && /android/.test(UA);
    const render = sharedData => {
        if (isAndroidWechat) {
            res.render('accessDenied', {
                icon: 'androidWechat',
            });
        } else {
            const { sharers, data, viewCount } = sharedData;
            res.render('share', {
                assets    : __assets,
                sharedData: { sharers, data, viewCount },
                isBlocked : !!req.acceptsLanguages('zh', 'pa-pk', 'ko-kp', 'fa-ir'),
            });
        }
    };

    promiseShareFindOne({ id })
    .then(found => {
        if (found) {
            Object.assign(found, { viewCount: found.viewCount + 1 });
            found.save(err => {
                if (err) {
                    next({ statusCode: 500 });
                } else {
                    render(found);
                }
            });
        } else {
            res.redirect('/settings');
        }
    }, err => next({ statusCode: 500 }));
});

module.exports = router;
