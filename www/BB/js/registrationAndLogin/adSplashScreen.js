Game.adSplashScreen = function () { };
Game.adSplashScreen.prototype = {

    init: function (user, app_Mode) {
        console.log("i'm inside ad splash screen");

        // if(screen.orientation == 'landscape')
        // {
        window.user = user;
        if (user.deviceid) {
            window.user.deviceid = user.deviceid;
        } else if (user.deviceId) {
            window.user.deviceid = user.deviceId;
        }
        console.log(user.deviceId, user.deviceid, "user.deviceId >>");
        screen.orientation.lock('portrait');
        AndroidFullScreen.setSystemUiVisibility(AndroidFullScreen.SYSTEM_UI_FLAG_LOW_PROFILE, null, null);
        _this.game.scale.setGameSize(540, 960);
        _this.scale.forceOrientation(true, false);
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        //}
        _this = this;
        _this.user = user;
        console.log(_this.user);
        _this.app_Mode = app_Mode;

    },

    onDeviceReady: function () {
        //this.receivedEvent('deviceready');
        AndroidFullScreen.immersiveMode(successFunction, errorFunction);
    },

    preload: function (game) {

    },

    create: function (game) {
        _this = this;

        _this.i = 0;

        console.log(_this.user.language, "--------user language--------");

        // Show ad splash image
        var adsplash = game.add.sprite(game.world.centerX, game.world.centerY, 'adSplashEng');
        adsplash.scale.setTo(0.5, 0.5);
        adsplash.anchor.setTo(0.5);

        // Add close button
        _this.closeButton = game.add.sprite(40, 40, 'closeIcon');
        _this.closeButton.scale.setTo(0.35);
        _this.closeButton.anchor.setTo(0.5);
        _this.closeButton.inputEnabled = true;

        // On close, destroy splash and move to main screen
        _this.closeButton.events.onInputDown.add(function () {
            console.log("Ad splash closed!");
            adsplash.destroy();
            _this.closeButton.destroy();

            // Now move to your login edit screen
            _this.state.start('appLoginEditScreenbbpp', true, false, _this.user, _this.app_Mode);
        }, _this);

    },



};
function successFunction() {
    console.log('Immersive mode set successfully.');
}

function errorFunction(error) {
    console.error('Error setting immersive mode:', error);
}