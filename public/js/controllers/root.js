angular.module('Oneline.rootControllers', [])
.controller('rootController', [
        '$scope', '$timeout', '$state', 'olTokenHelper',
    function ($scope, $timeout, $state, olTokenHelper){


    /**
     * 初始化
     *     1. 初始化「社交網站列表」
     *     2. 初始化 `isTimeline` & `isControlCenter` 的值
     */
    // 1
    $scope.providerList = olTokenHelper.getProviderList()
    // 2
    $scope.isTimeline = false
    $scope.controlCenter = ''

    // 刷新「社交網站列表」
    $scope.updateProviderList = function (){
        $timeout(function (){
            $scope.providerList = olTokenHelper.getProviderList()
        })
    }
    // 設置當前是否為「時間線頁面」
    $scope.setTimeline = function (value){
        $scope.isTimeline = value
    }
    // 設置是否顯示「控制中心」
    $scope.setControlCenter = function (value){
        $scope.controlCenter = value
    }
    // 驗證 provider 是否已授權
    $scope.isAuth = function (provider){
        return $scope.providerList.indexOf(provider) >= 0
    }

    $scope.goto = function (state, e){
        if (state === 'timeline' && $scope.providerList <= 0) return;

        var target = e.target
        if (target.tagName.toLowerCase() === 'img' 
            && angular.element(target).parent().find('img').length > 1) return;

        $state.go(state)
    }

    /**
     * Control Center
     *
     */
    $scope.toggleControlCenter = function (type){
        $scope.controlCenter === type
            ? $scope.setControlCenter('')
            : $scope.setControlCenter(type)
    }
    $scope.toggleActive = function (e){
        var elem = angular.element(e.currentTarget);
        elem.toggleClass('tips--active')
    }
}])