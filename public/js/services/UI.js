angular.module('Oneline.UIServices', [])
.service('olUI', function(){
    // 設置是否為「正在加載」
    this.setLoading = function (bool, step){
        var loadingElem = angular.element(document.getElementsByClassName('loadMore')[step === 1 ? 0 : 1]);

        if (bool){
            loadingElem.children().addClass('loadMore__loading')
        } else {
            loadingElem.removeClass('loadMore--initLoad')
            loadingElem.children().removeClass('loadMore__loading')
        }
    }
    // 判斷是否「正在加載」
    this.isLoading = function (step){
        var loadingElem = angular.element(document.getElementsByClassName('loadMore')[step === 1 ? 0 : 1]);

        return loadingElem.children().hasClass('loadMore__loading')
    }
    // 設置上次閱讀位置提醒
    this.setDivider = function (step){
        var timelineElem = document.querySelectorAll('.timeline:not(.timeline--quote)');

        if (step === 1){
            angular.element(timelineElem[0]).addClass('divider divider--top')
        } else {
            angular.element(timelineElem[timelineElem.length - 1]).addClass('divider divider--bottom')
        }
    },
    // 設置未讀「新／舊帖文」數提醒
    this.setPostsCount = function (type, count){
        document
        .getElementsByClassName('loadMore__count')[type === 'newPosts' ? 0 : 1]
        .setAttribute('data-count', count === 0 ? '' : count)
    }
    /**
     * 其他操作相關
     *
     *
     */
    var getActionElem = function (action, id){
        return angular.element(document
        .querySelector('[data-id="' + id + '"]')
        .querySelector('[data-' + action + ']'))
    }
    // 設置 Action 圖標狀態
    this.setActionState = function (action, id, state){
        var actionElem = getActionElem(action, id);

        switch (state){
            case 'wait':
                actionElem.addClass('actions__button--wait')
                break;
            case 'done':
                actionElem.removeClass('actions__button--wait')
                break;
            case 'active':
                actionElem.addClass('actions__button--active')
                actionElem.parent().addClass('tips--active')
                break;
            case 'inactive':
                actionElem.removeClass('actions__button--active')
                actionElem.parent().removeClass('tips--active')
                break;
        }
    }
    // 判斷是否為激活狀態
    this.isActionActive = function (action, id){
        var actionElem = getActionElem(action, id);

        return actionElem.hasClass('actions__button--active')
    }
    // 判斷是否正在處理中
    this.isActionWait = function (action, id){
        var actionElem = getActionElem(action, id);

        return actionElem.hasClass('actions__button--wait')
    }
    // 判斷是否為已凍結的操作
    this.isActionFrozen = function (action, id){
        var actionElem = getActionElem(action, id)

        return actionElem.parent().hasClass('tips--frozen')
    }
    // 獲取／設置需要綁定的數據
    this.actionData = function (action, id, data, type){
        var actionElem = getActionElem(action, id),
            attr_str;

        if (type === 'count'){
            actionElem = actionElem.next()
            attr_str = 'data-count';
        } else {
            attr_str = 'data-' + action;
        }

        console.log(actionElem, attr_str)
        if (data || data === ''){
            actionElem.attr(attr_str, data)
        } else {
            return actionElem.attr(attr_str)
        }
    }
})