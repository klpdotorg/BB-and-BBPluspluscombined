Game.grade7Geometry = function (game) {

};

Game.grade7Geometry.prototype = {

	init: function () {
		_this = this;
		//console.log("sync telemetry"+navigator.connection.type);
		if (navigator.connection.type != "none" && navigator.connection.type != "unknown" && navigator.connection.type != null && navigator.connection.type != "undefined") {
			console.log("sync telemetry" + navigator.connection.type);
			//absdsjsapi.syncTelemetryData();
		}

		document.addEventListener("online", _this.syncTelFunc, false);

	},

	syncTelFunc: function () {
		if (navigator.connection.type != "none" && navigator.connection.type != "unknown" && navigator.connection.type != null && navigator.connection.type != "undefined") {
			console.log("sync telemetry" + navigator.connection.type);
			//absdsjsapi.syncTelemetryData();
		}
	},

	create: function (game) {

		nativeApp.screenViewStringPass("Practice_activity_list", "grade7Geometry");

		_this = this;

		this.game.input.enabled = false;

		grade7NumberSystemsSelected = false;
		grade7AlgebraSelected = false;
		grade7RatioandProportionSelected = false;
		grade7GeometrySelected = false;
		grade7DecimalsSelected = false;

		_this.tween = null;
		_this.tap = false;
		//adding bg, title to the scene.
		_this.background = _this.add.tileSprite(0, 0, _this.world.width, _this.world.height, 'gameselectBg');

		_this.gradeBackBtn = _this.add.sprite(-5, 3, 'gradeSceneBackBtn');
		_this.gradeBackBtn.inputEnabled = true;
		_this.gradeBackBtn.input.useHandCursor = true;
		_this.gradeBackBtn.input.priorityID = 1;
		_this.gradeBackBtn.events.onInputDown.add(function (target) {
			target.events.onInputDown.removeAll();
			//_this.cache.destroy();
			_this.clickSound = _this.add.audio('ClickSound');
			_this.clickSound.play();
			grade7NumberSystemsSelected = false;
			_this.state.start('selectgrade7MicroConceptScreen', true, false);
		}, _this);


		this.gameModeShareBtn = game.add.image(920, 18, 'shareIcon');
		this.gameModeShareBtn.anchor.setTo(0.5);
		this.gameModeShareBtn.scale.setTo(0.75);
		this.gameModeShareBtn.inputEnabled = true;
		this.gameModeShareBtn.input.useHandCursor = true;
		this.gameModeShareBtn.input.priorityID = 1;
		this.gameModeShareBtn.events.onInputDown.add(function () {
			this.clickSound = this.add.audio('ClickSound');
			this.clickSound.play();
			nativeApp.ShareApp();
		}, this);


		_this.grade7ShapesGroup = _this.add.group();
		_this.grade7MensurationGroup = _this.add.group();

		_this.addgrade7ShapesTopic();
		//_this.addgrade7MensurationTopic();

		_this.grade7ShapesGroup.x = 0;
		_this.grade7ShapesGroup.y = 0;

		_this.grade7MensurationGroup.x = 0;
		_this.grade7MensurationGroup.y = 500;

		_this.graphicsBg = _this.add.graphics(0, 0);
		_this.graphicsBg.lineStyle(0, 0xFFFFFF, 0.8);
		_this.graphicsBg.beginFill(0x139487, 0);
		_this.graphicsBg.drawRect(0, 0, 960, 4000);
		_this.graphicsBg.boundsPadding = 0;

		_this.mask = _this.add.graphics();
		_this.mask.position.x = 0;
		_this.mask.position.y = 35;
		_this.mask.beginFill(0, 1);
		_this.mask.moveTo(0, 0);
		_this.mask.lineTo(960, 0);
		_this.mask.lineTo(960, 505);
		_this.mask.lineTo(0, 505);
		_this.mask.lineTo(0, 0);
		_this.mask.endFill();
		_this.graphicsBg.mask = _this.mask;


		_this.graphicsBg.addChild(_this.grade7ShapesGroup);
		_this.graphicsBg.addChild(_this.grade7MensurationGroup);


		_this.swipeUpFlag = true;
		_this.swipeDownFlag = false;
		_this.page = document.getElementById("body");
		_this.mc = new Hammer(_this.page);
		_this.mc.get('swipe').set({ direction: Hammer.DIRECTION_ALL, enable: false });

		_this.mc.on("swipeleft", function () {
			//console.log('swipeleft');
		});

		_this.mc.on("swiperight", function () {
			//console.log('swiperight');
		});

		_this.mc.on("swipeup", function (v) {
			
			_this.tween = game.add.tween(_this.graphicsBg);
			_this.tween.to({ y: _this.graphicsBg.y - (v.distance * (v.overallVelocity * 2 / -1)) }, 0, 'Linear', true, 0);
			_this.tween.onComplete.add(function () {
				//	swipeDownFlag = true;
				_this.tween = null;
				if (_this.graphicsBg.y <= -1570) {
					//swipeUpFlag = false;
					_this.graphicsBg.y = -1570;
				}

				//game.input.enabled = true;
			}, _this);
			_this.tween.onUpdateCallback(function () {
				_this.tap = false;
				if (_this.graphicsBg.y <= -1570) {
					//swipeUpFlag = false;
					_this.graphicsBg.y = -1570;
					_this.tween.stop();
					//_this.tween = null;
					//game.input.enabled = true;
				}
			}, _this);

			//	}
		});

		_this.mc.on("swipedown", function (v) {

			_this.tween = game.add.tween(_this.graphicsBg);
			_this.tween.to({ y: _this.graphicsBg.y + (v.distance * (v.overallVelocity * 2)) }, 0, 'Linear', true, 0);
			_this.tween.onComplete.add(function () {
				//	swipeUpFlag = true;
				_this.tween = null;
				if (_this.graphicsBg.y >= 0) {
					//	swipeDownFlag = false;
					_this.graphicsBg.y = 0;
				}
				//game.input.enabled = true;
			}, _this);

			_this.tween.onUpdateCallback(function () {
				tap = false;
				if (_this.graphicsBg.y >= 0) {
					//swipeUpFlag = false;
					_this.graphicsBg.y = 0;
					_this.tween.stop();
					//_this.tween = null;
					//game.input.enabled = true;
				}
			}, _this);
			//	}
		});

		_this.input.onDown.add(function () {
			if (_this.tween) {
				if (_this.tween.isRunning) {
					_this.tween.stop();
					//_this.tween = null;
				}
			}

			_this.graphicsBg.inputEnabled = true;
			_this.graphicsBg.input.enableDrag();
			_this.graphicsBg.input.allowHorizontalDrag = false;

			_this.graphicsBg.events.onDragUpdate.add(function () {
				_this.tap = false;
				if (_this.tween) {
					if (_this.tween.isRunning) {
						_this.tween.stop();
						//_this.tween = null;
					}
				}
				if (_this.graphicsBg.y >= 10) {
					//swipeUpFlag = false;
					_this.graphicsBg.y = 0;
					//tween.stop();
					//game.input.enabled = true;
				}
				else if (_this.graphicsBg.y <= -2070) {
					//swipeUpFlag = false;
					_this.graphicsBg.y = -2070;
					//tween.stop();
					//game.input.enabled = true;
				}
			}, _this);

			_this.graphicsBg.events.onDragStop.add(function (e) {
				_this.tap = false;
				//console.log(e);
				if (_this.tween) {
					//if(tween.isRunning)
					_this.tween.stop();
					//_this.tween = null;
				}

				if (_this.graphicsBg.y >= 0) {
					//	swipeDownFlag = false;
					_this.graphicsBg.y = 0;
				}
				else if (_this.graphicsBg.y <= -2070) {
					//swipeUpFlag = false;
					_this.graphicsBg.y = -2070;
				}

			}, _this);

		}, _this);

		_this.input.onTap.add(function () {
			//console.log("tap");
			_this.tap = true;
			_this.time.events.add(300, function () {
				_this.time.events.removeAll();
				_this.tap = false;
				//console.log("tapfalse");
			}, _this);
		}, _this);


		if (gradeScreen) {
			_this.graphicsBg.y = -2070;

			var gameScreenTween = game.add.tween(_this.graphicsBg);
			gameScreenTween.to({ y: 0 }, 2000, 'Linear', true, 0);
			gameScreenTween.onComplete.add(function () {
				this.game.input.enabled = true;

				if (_this.mc) {
					_this.mc.get('swipe').set({ direction: Hammer.DIRECTION_ALL, enable: true });
				}


			}, _this);


			gradeScreen = false;

		}
		else {
			if (_this.mc) {
				_this.mc.get('swipe').set({ direction: Hammer.DIRECTION_ALL, enable: true });
			}
			this.game.input.enabled = true;
		}

		//this.game.input.enabled = true;
	},

	addgrade7ShapesTopic: function () {
		_this.topicTxtBg = _this.add.graphics(100, 60);
		_this.topicTxtBg.lineStyle(0, 0xFFFFFF, 0.8);
		_this.topicTxtBg.beginFill(0x139487, 1);
		_this.topicTxtBg.drawRoundedRect(0, 0, 170, 100, 10);
		_this.topicTxtBg.boundsPadding = 0;


		_this.topicTitleText = this.add.text(185, 85, ' \n ' + window.selctedLang.shapesTitle + ' \n ');
		_this.topicTitleText.anchor.setTo(0.5);
		_this.topicTitleText.align = 'center';


		_this.topicTitleText.font = 'gradefont';
		_this.topicTitleText.fontSize = 26;
		_this.topicTitleText.fontWeight = 'normal';
		_this.topicTitleText.fill = 'white';

		_this.topicTitleText.wordWrap = true;
		_this.topicTitleText.wordWrapWidth = 500;
		
		_this.topicBg = _this.add.graphics(75, 100);
		_this.topicBg.lineStyle(0, 0xFFFFFF, 0.8);
		_this.topicBg.beginFill(0x139487, 1);
		_this.topicBg.drawRoundedRect(0, 0, 805, 600, 30);
		_this.topicBg.boundsPadding = 0;

		_this.GMS_2_Screen = _this.add.sprite(100, 120, 'GMSS_1_Screen');
		_this.bgGraphicNum2 = this.add.graphics(210, 175);
		_this.bgGraphicNum2.lineStyle(0, 0xFFFFFF, 0.8);
		_this.bgGraphicNum2.beginFill(0x493A19, 1);
		_this.bgGraphicNum2.drawRoundedRect(0, 0, 30, 30, 10);
		_this.bgGraphicNum2.boundsPadding = 0;
		_this.GMS_2_ScreenTxt = this.add.text(225, 192, ' \n ' + window.selctedLang.GMS_2_Screen + ' \n ');
		_this.GMS_2_ScreenTxt.anchor.setTo(0.5);
		_this.GMS_2_ScreenTxt.align = 'center';
		_this.GMS_2_ScreenTxt.font = 'gradefont';
		_this.GMS_2_ScreenTxt.fontSize = 20;
		_this.GMS_2_ScreenTxt.fontWeight = 'normal';
		_this.GMS_2_ScreenTxt.fill = 'white';
		_this.GMS_2_ScreenTxt.wordWrap = true;
		_this.GMS_2_ScreenTxt.wordWrapWidth = 500;
		_this.GMS_2_Screen.inputEnabled = true;
		_this.GMS_2_Screen.input.useHandCursor = true;
		_this.GMS_2_Screen.name = "GMS-2";
		_this.GMS_2_Screen.events.onInputDown.add(function (target) {
			_this.time.events.add(300, function () {
				if (_this.tap) {
					_this.time.events.removeAll();
					target.events.onInputDown.removeAll();
					_this.clickSound = _this.add.audio('ClickSound');
					_this.clickSound.play();
					_this.state.start('preloader_GMSS_01_G7', true, false);
				}
			}, _this);
		}, _this);

		_this.GMS_3_Screen = _this.add.sprite(300, 120, 'GMSS_2_Screen');
		_this.bgGraphicNum3 = this.add.graphics(410, 175);
		_this.bgGraphicNum3.lineStyle(0, 0xFFFFFF, 0.8);
		_this.bgGraphicNum3.beginFill(0x493A19, 1);
		_this.bgGraphicNum3.drawRoundedRect(0, 0, 30, 30, 10);
		_this.bgGraphicNum3.boundsPadding = 0;
		_this.GMS_3_ScreenTxt = this.add.text(425, 192, ' \n ' + window.selctedLang.GMS_3_Screen + ' \n ');
		_this.GMS_3_ScreenTxt.anchor.setTo(0.5);
		_this.GMS_3_ScreenTxt.align = 'center';
		_this.GMS_3_ScreenTxt.font = 'gradefont';
		_this.GMS_3_ScreenTxt.fontSize = 20;
		_this.GMS_3_ScreenTxt.fontWeight = 'normal';
		_this.GMS_3_ScreenTxt.fill = 'white';
		_this.GMS_3_ScreenTxt.wordWrap = true;
		_this.GMS_3_ScreenTxt.wordWrapWidth = 500;
		_this.GMS_3_Screen.inputEnabled = true;
		_this.GMS_3_Screen.name = "GMS-3";
		_this.GMS_3_Screen.input.useHandCursor = true;
		_this.GMS_3_Screen.events.onInputDown.add(function (target) {
			_this.time.events.add(300, function () {
				if (_this.tap) {
					_this.time.events.removeAll();
					target.events.onInputDown.removeAll();
					_this.clickSound = _this.add.audio('ClickSound');
					_this.clickSound.play();
					_this.state.start('preloader_GMSS_02_G7', true, false);
				}
			}, _this);
		}, _this);

		_this.GMS_4_Screen = _this.add.sprite(500, 120, 'GMSS_3_Screen');
		_this.bgGraphicFr4 = this.add.graphics(610, 175);
		_this.bgGraphicFr4.lineStyle(0, 0xFFFFFF, 0.8);
		_this.bgGraphicFr4.beginFill(0x493A19, 1);
		_this.bgGraphicFr4.drawRoundedRect(0, 0, 30, 30, 10);
		_this.bgGraphicFr4.boundsPadding = 0;
		_this.GMS_4_ScreenTxt = this.add.text(625, 192, ' \n ' + window.selctedLang.GMR_1_Screen + ' \n ');
		_this.GMS_4_ScreenTxt.anchor.setTo(0.5);
		_this.GMS_4_ScreenTxt.align = 'center';
		_this.GMS_4_ScreenTxt.font = 'gradefont';
		_this.GMS_4_ScreenTxt.fontSize = 20;
		_this.GMS_4_ScreenTxt.fontWeight = 'normal';
		_this.GMS_4_ScreenTxt.fill = 'white';
		_this.GMS_4_ScreenTxt.wordWrap = true;
		_this.GMS_4_ScreenTxt.wordWrapWidth = 500;
		_this.GMS_4_Screen.inputEnabled = true;
		_this.GMS_4_Screen.name = "GMR-4";
		_this.GMS_4_Screen.input.useHandCursor = true;
		_this.GMS_4_Screen.events.onInputDown.add(function (target) {
			_this.time.events.add(300, function () {
				if (_this.tap) {
					_this.time.events.removeAll();
					target.events.onInputDown.removeAll();
					_this.clickSound = _this.add.audio('ClickSound');
					_this.clickSound.play();
					_this.state.start('preloader_GMSS_03_G7', true, false);
				}
			}, _this);
		}, _this);

		_this.GMCR_1_Screen = _this.add.sprite(700, 120, 'GMSS_4_Screen');
		_this.bgGraphicNum5 = this.add.graphics(810, 175);
		_this.bgGraphicNum5.lineStyle(0, 0xFFFFFF, 0.8);
		_this.bgGraphicNum5.beginFill(0x493A19, 1);
		_this.bgGraphicNum5.drawRoundedRect(0, 0, 30, 30, 10);
		_this.bgGraphicNum5.boundsPadding = 0;
		_this.GMCR_1_ScreenTxt = this.add.text(825, 192, ' \n ' + window.selctedLang.GMCR_1_Screen + ' \n ');
		_this.GMCR_1_ScreenTxt.anchor.setTo(0.5);
		_this.GMCR_1_ScreenTxt.align = 'center';
		_this.GMCR_1_ScreenTxt.font = 'gradefont';
		_this.GMCR_1_ScreenTxt.fontSize = 20;
		_this.GMCR_1_ScreenTxt.fontWeight = 'normal';
		_this.GMCR_1_ScreenTxt.fill = 'white';
		_this.GMCR_1_ScreenTxt.wordWrap = true;
		_this.GMCR_1_ScreenTxt.wordWrapWidth = 500;
		_this.GMCR_1_Screen.inputEnabled = true;
		_this.GMCR_1_Screen.input.useHandCursor = true;
		_this.GMCR_1_Screen.name = "GMCR-1";
		_this.GMCR_1_Screen.events.onInputDown.add(function (target) {
			_this.time.events.add(300, function () {
				if (_this.tap) {
					_this.time.events.removeAll();
					target.events.onInputDown.removeAll();
					_this.clickSound = _this.add.audio('ClickSound');
					_this.clickSound.play();
					_this.state.start('preloader_GMSS_04_G7', true, false);
				}
			}, _this);
		}, _this);

		_this.GMLA_1_Screen = _this.add.sprite(100, 320, 'GMLA_1_Screen');
		_this.bgGraphicAlg7 = this.add.graphics(210, 375);
		_this.bgGraphicAlg7.lineStyle(0, 0xFFFFFF, 0.8);
		_this.bgGraphicAlg7.beginFill(0x493A19, 1);
		_this.bgGraphicAlg7.drawRoundedRect(0, 0, 30, 30, 10);
		_this.bgGraphicAlg7.boundsPadding = 0;
		_this.GMLA_1_ScreenTxt = this.add.text(225, 392, ' \n ' + window.selctedLang.GMLA_1_Screen + ' \n ');
		_this.GMLA_1_ScreenTxt.anchor.setTo(0.5);
		_this.GMLA_1_ScreenTxt.align = 'center';
		_this.GMLA_1_ScreenTxt.font = 'gradefont';
		_this.GMLA_1_ScreenTxt.fontSize = 20;
		_this.GMLA_1_ScreenTxt.fontWeight = 'normal';
		_this.GMLA_1_ScreenTxt.fill = 'white';
		_this.GMLA_1_ScreenTxt.wordWrap = true;
		_this.GMLA_1_ScreenTxt.wordWrapWidth = 500;
		_this.GMLA_1_Screen.inputEnabled = true;
		_this.GMLA_1_Screen.name = "ALD-1";
		_this.GMLA_1_Screen.input.useHandCursor = true;
		_this.GMLA_1_Screen.events.onInputDown.add(function (target) {
			_this.time.events.add(300, function () {
				if (_this.tap) {
					_this.time.events.removeAll();
					target.events.onInputDown.removeAll();
					_this.clickSound = _this.add.audio('ClickSound');
					_this.clickSound.play();
					_this.state.start('preloader_GMLA_01_G7', true, false);
				}
			}, _this);
		}, _this);

		_this.GMLA_2_Screen = _this.add.sprite(300, 320, 'GMLA_2_Screen');
		_this.bgGraphicAlg8 = this.add.graphics(410, 375);
		_this.bgGraphicAlg8.lineStyle(0, 0xFFFFFF, 0.8);
		_this.bgGraphicAlg8.beginFill(0x493A19, 1);
		_this.bgGraphicAlg8.drawRoundedRect(0, 0, 30, 30, 10);
		_this.bgGraphicAlg8.boundsPadding = 0;
		_this.GMLA_2_ScreenTxt = this.add.text(425, 392, ' \n ' + window.selctedLang.GMLA_2_Screen + ' \n ');
		_this.GMLA_2_ScreenTxt.anchor.setTo(0.5);
		_this.GMLA_2_ScreenTxt.align = 'center';
		_this.GMLA_2_ScreenTxt.font = 'gradefont';
		_this.GMLA_2_ScreenTxt.fontSize = 20;
		_this.GMLA_2_ScreenTxt.fontWeight = 'normal';
		_this.GMLA_2_ScreenTxt.fill = 'white';
		_this.GMLA_2_ScreenTxt.wordWrap = true;
		_this.GMLA_2_ScreenTxt.wordWrapWidth = 500;
		_this.GMLA_2_Screen.inputEnabled = true;
		_this.GMLA_2_Screen.input.useHandCursor = true;
		_this.GMLA_2_Screen.name = "NSD-1";
		_this.GMLA_2_Screen.events.onInputDown.add(function (target) {
			_this.time.events.add(300, function () {
				if (_this.tap) {
					_this.time.events.removeAll();
					target.events.onInputDown.removeAll();
					_this.clickSound = _this.add.audio('ClickSound');
					_this.clickSound.play();
					_this.state.start('preloader_GMLA_02_G7', true, false);
				}
			}, _this);
		}, _this);

		_this.GMLA_3_Screen = _this.add.sprite(500, 320, 'GMLA_3_Screen');
		_this.bgGraphicAlg9 = this.add.graphics(810, 375);
		_this.bgGraphicAlg9.lineStyle(0, 0xFFFFFF, 0.8);
		_this.bgGraphicAlg9.beginFill(0x493A19, 1);
		_this.bgGraphicAlg9.drawRoundedRect(0, 0, 30, 30, 10);
		_this.bgGraphicAlg9.boundsPadding = 0;
		_this.GMLA_3_ScreenTxt = this.add.text(625, 392, ' \n ' + window.selctedLang.GMLA_3_Screen + ' \n ');
		_this.GMLA_3_ScreenTxt.anchor.setTo(0.5);
		_this.GMLA_3_ScreenTxt.align = 'center';
		_this.GMLA_3_ScreenTxt.font = 'gradefont';
		_this.GMLA_3_ScreenTxt.fontSize = 20;
		_this.GMLA_3_ScreenTxt.fontWeight = 'normal';
		_this.GMLA_3_ScreenTxt.fill = 'white';
		_this.GMLA_3_ScreenTxt.wordWrap = true;
		_this.GMLA_3_ScreenTxt.wordWrapWidth = 500;
		_this.GMLA_3_Screen.inputEnabled = true;
		_this.GMLA_3_Screen.input.useHandCursor = true;
		_this.GMLA_3_Screen.name = "NSD-2A";
		_this.GMLA_3_Screen.events.onInputDown.add(function (target) {
			_this.time.events.add(300, function () {
				if (_this.tap) {
					_this.time.events.removeAll();
					target.events.onInputDown.removeAll();
					_this.clickSound = _this.add.audio('ClickSound');
					_this.clickSound.play();
					_this.state.start('preloader_GMLA_03_G7', true, false);
				}
			}, _this);
		}, _this);

		_this.GMLA_4_Screen = _this.add.sprite(700, 320, 'GMLA_4_Screen');
		_this.bgGraphicAlg10 = this.add.graphics(210, 575);
		_this.bgGraphicAlg10.lineStyle(0, 0xFFFFFF, 0.8);
		_this.bgGraphicAlg10.beginFill(0x493A19, 1);
		_this.bgGraphicAlg10.drawRoundedRect(0, 0, 30, 30, 10);
		_this.bgGraphicAlg10.boundsPadding = 0;
		_this.GMLA_4_ScreenTxt = this.add.text(825, 392, ' \n ' + window.selctedLang.GMLA_4_Screen + ' \n ');
		_this.GMLA_4_ScreenTxt.anchor.setTo(0.5);
		_this.GMLA_4_ScreenTxt.align = 'center';
		_this.GMLA_4_ScreenTxt.font = 'gradefont';
		_this.GMLA_4_ScreenTxt.fontSize = 20;
		_this.GMLA_4_ScreenTxt.fontWeight = 'normal';
		_this.GMLA_4_ScreenTxt.fill = 'white';
		_this.GMLA_4_ScreenTxt.wordWrap = true;
		_this.GMLA_4_ScreenTxt.wordWrapWidth = 500;
		_this.GMLA_4_Screen.inputEnabled = true;
		_this.GMLA_4_Screen.name = "NSF-2B";
		_this.GMLA_4_Screen.input.useHandCursor = true;
		_this.GMLA_4_Screen.events.onInputDown.add(function (target) {
			_this.time.events.add(300, function () {
				if (_this.tap) {
					_this.time.events.removeAll();
					target.events.onInputDown.removeAll();
					_this.clickSound = _this.add.audio('ClickSound');
					_this.clickSound.play();
					_this.state.start('preloader_GMLA_04_G7', true, false);
				}
			}, _this);
		}, _this);

		_this.GMLA_5_Screen = _this.add.sprite(100,520,'GMLA_5_Screen');
		_this.bgGraphicAlg11 = this.add.graphics(210,575);
		_this.bgGraphicAlg11.lineStyle(0, 0xFFFFFF, 0.8);
		_this.bgGraphicAlg11.beginFill(0x493A19, 1);
		_this.bgGraphicAlg11.drawRoundedRect(0,0,30,30,10);
		_this.bgGraphicAlg11.boundsPadding = 0;
		_this.GMLA_5_ScreenTxt = this.add.text(225, 592, ' \n '+window.selctedLang.GMLA_5_Screen+' \n ');
		_this.GMLA_5_ScreenTxt.anchor.setTo(0.5);
		_this.GMLA_5_ScreenTxt.align = 'center';
		_this.GMLA_5_ScreenTxt.font = 'gradefont';
		_this.GMLA_5_ScreenTxt.fontSize = 20;
		_this.GMLA_5_ScreenTxt.fontWeight = 'normal';
		_this.GMLA_5_ScreenTxt.fill = 'white';
		_this.GMLA_5_ScreenTxt.wordWrap = true;
		_this.GMLA_5_ScreenTxt.wordWrapWidth = 500;
		_this.GMLA_5_Screen.inputEnabled = true;
		_this.GMLA_5_Screen.name = "NSD-3A";
		_this.GMLA_5_Screen.input.useHandCursor = true;
		_this.GMLA_5_Screen.events.onInputDown.add(function(target){
			_this.time.events.add(300, function(){
				if(_this.tap)
				{
					_this.time.events.removeAll();
					target.events.onInputDown.removeAll();
					_this.clickSound = _this.add.audio('ClickSound');
					_this.clickSound.play();
					_this.state.start('preloader_GMLA_05_G7',true,false);
				}
			},_this);
		},_this);

		_this.GMLA_6_Screen = _this.add.sprite(300,520, 'GMLA_6_Screen');
		_this.bgGraphicInt12 = this.add.graphics(410, 575);
		_this.bgGraphicInt12.lineStyle(0, 0xFFFFFF, 0.8);
		_this.bgGraphicInt12.beginFill(0x493A19, 1);
		_this.bgGraphicInt12.drawRoundedRect(0, 0, 30, 30, 10);
		_this.bgGraphicInt12.boundsPadding = 0;
		_this.GMLA_6_ScreenTxt = this.add.text(425, 592, ' \n ' + window.selctedLang.GMLA_6_Screen + ' \n ');
		_this.GMLA_6_ScreenTxt.anchor.setTo(0.5);
		_this.GMLA_6_ScreenTxt.align = 'center';
		_this.GMLA_6_ScreenTxt.font = 'gradefont';
		_this.GMLA_6_ScreenTxt.fontSize = 20;
		_this.GMLA_6_ScreenTxt.fontWeight = 'normal';
		_this.GMLA_6_ScreenTxt.fill = 'white';
		_this.GMLA_6_ScreenTxt.wordWrap = true;
		_this.GMLA_6_ScreenTxt.wordWrapWidth = 500;
		_this.GMLA_6_Screen.inputEnabled = true;
		_this.GMLA_6_Screen.name = "INT-11";
		_this.GMLA_6_Screen.input.useHandCursor = true;
		_this.GMLA_6_Screen.events.onInputDown.add(function (target) {
			_this.time.events.add(300, function () {
				if (_this.tap) {
					_this.time.events.removeAll();
					target.events.onInputDown.removeAll();
					_this.clickSound = _this.add.audio('ClickSound');
					_this.clickSound.play();
					_this.state.start('preloader_GMLA_06_G7', true, false);
				}
			}, _this);
		}, _this);

		_this.GMLA_7_Screen = _this.add.sprite(500,520,'GMLA_7_Screen');//'GMLA_7_Screen'
		_this.bgGraphicNum6 = this.add.graphics(610, 575);
		_this.bgGraphicNum6.lineStyle(0, 0xFFFFFF, 0.8);
		_this.bgGraphicNum6.beginFill(0x493A19, 1);
		_this.bgGraphicNum6.drawRoundedRect(0,0,30,30,10);
		_this.bgGraphicNum6.boundsPadding = 0;
		_this.GMLA_7_ScreenTxt = this.add.text(625, 592, ' \n '+window.selctedLang.GMLA_7_Screen +' \n ');
		_this.GMLA_7_ScreenTxt.anchor.setTo(0.5);
		_this.GMLA_7_ScreenTxt.align = 'center';
		_this.GMLA_7_ScreenTxt.font = 'gradefont';
		_this.GMLA_7_ScreenTxt.fontSize = 20;
		_this.GMLA_7_ScreenTxt.fontWeight = 'normal';
		_this.GMLA_7_ScreenTxt.fill = 'white';
		_this.GMLA_7_ScreenTxt.wordWrap = true;
		_this.GMLA_7_ScreenTxt.wordWrapWidth = 500;
		_this.GMLA_7_Screen .inputEnabled = true;
		_this.GMLA_7_Screen .name = "GMAN-1";
		_this.GMLA_7_Screen .input.useHandCursor = true;
		_this.GMLA_7_Screen .events.onInputDown.add(function(target){
			_this.time.events.add(300, function(){
				if(_this.tap)
				{					
					_this.time.events.removeAll();
					target.events.onInputDown.removeAll();
					_this.clickSound = _this.add.audio('ClickSound');
					_this.clickSound.play();
					_this.state.start('preloader_GMLA_07_G7',true,false);
				}
			},_this);
		},_this);

		_this.GMS_1_Screen = _this.add.sprite(700, 520, 'GM_PYTH_Screen');
		_this.bgGraphicFr1 = this.add.graphics(810, 575);
		_this.bgGraphicFr1.lineStyle(0, 0xFFFFFF, 0.8);
		_this.bgGraphicFr1.beginFill(0x493A19, 1);
		_this.bgGraphicFr1.drawRoundedRect(0, 0, 30, 30, 10);
		_this.bgGraphicFr1.boundsPadding = 0;
		_this.GMS_1_ScreenTxt = this.add.text(825, 592, ' \n ' + window.selctedLang.GMS_1_Screen + ' \n ');
		_this.GMS_1_ScreenTxt.anchor.setTo(0.5);
		_this.GMS_1_ScreenTxt.align = 'center';
		_this.GMS_1_ScreenTxt.font = 'gradefont';
		_this.GMS_1_ScreenTxt.fontSize = 20;
		_this.GMS_1_ScreenTxt.fontWeight = 'normal';
		_this.GMS_1_ScreenTxt.fill = 'white';
		_this.GMS_1_ScreenTxt.wordWrap = true;
		_this.GMS_1_ScreenTxt.wordWrapWidth = 500;
		_this.GMS_1_Screen.inputEnabled = true;
		_this.GMS_1_Screen.input.useHandCursor = true;
		_this.GMS_1_Screen.name = "GMPYTH_G7";
		_this.GMS_1_Screen.events.onInputDown.add(function (target) {
			_this.time.events.add(300, function () {
				if (_this.tap) {
					_this.time.events.removeAll();
					target.events.onInputDown.removeAll();
					_this.clickSound = _this.add.audio('ClickSound');
					_this.clickSound.play();
					_this.state.start('preloader_GMPYTH_G7', true, false);
				}
			}, _this);
		}, _this);

		if (window.languageSelected == "Hindi") {
			
		}
		else if (window.languageSelected == "Kannada") {
		
		}
		else {
		
		}

		_this.grade7ShapesGroup.add(_this.topicTxtBg);
		_this.grade7ShapesGroup.add(_this.topicTitleText);
		_this.grade7ShapesGroup.add(_this.topicBg);
		_this.grade7ShapesGroup.add(_this.GMS_1_Screen);
		_this.grade7ShapesGroup.add(_this.bgGraphicFr1);
		_this.grade7ShapesGroup.add(_this.GMS_1_ScreenTxt);
		_this.grade7ShapesGroup.add(_this.GMS_2_Screen);
		_this.grade7ShapesGroup.add(_this.bgGraphicNum2);
		_this.grade7ShapesGroup.add(_this.GMS_2_ScreenTxt);
		_this.grade7ShapesGroup.add(_this.GMS_3_Screen);
		_this.grade7ShapesGroup.add(_this.bgGraphicNum3);
		_this.grade7ShapesGroup.add(_this.GMS_3_ScreenTxt);
		_this.grade7ShapesGroup.add(_this.GMS_4_Screen);
		_this.grade7ShapesGroup.add(_this.bgGraphicFr4);
		_this.grade7ShapesGroup.add(_this.GMS_4_ScreenTxt);
		_this.grade7ShapesGroup.add(_this.GMCR_1_Screen);
		_this.grade7ShapesGroup.add(_this.bgGraphicNum5);
		_this.grade7ShapesGroup.add(_this.GMCR_1_ScreenTxt);

		_this.grade7ShapesGroup.add(_this.GMLA_7_Screen);
		_this.grade7ShapesGroup.add(_this.bgGraphicNum6);
		_this.grade7ShapesGroup.add(_this.GMLA_7_ScreenTxt);

		_this.grade7ShapesGroup.add(_this.GMLA_1_Screen);
		_this.grade7ShapesGroup.add(_this.bgGraphicAlg7);
		_this.grade7ShapesGroup.add(_this.GMLA_1_ScreenTxt);

		_this.grade7ShapesGroup.add(_this.GMLA_2_Screen);
		_this.grade7ShapesGroup.add(_this.bgGraphicAlg8);
		_this.grade7ShapesGroup.add(_this.GMLA_2_ScreenTxt);

		_this.grade7ShapesGroup.add(_this.GMLA_3_Screen);
		_this.grade7ShapesGroup.add(_this.bgGraphicAlg9);
		_this.grade7ShapesGroup.add(_this.GMLA_3_ScreenTxt);

		_this.grade7ShapesGroup.add(_this.GMLA_4_Screen);
		_this.grade7ShapesGroup.add(_this.bgGraphicAlg10);
		_this.grade7ShapesGroup.add(_this.GMLA_4_ScreenTxt);

		_this.grade7ShapesGroup.add(_this.GMLA_5_Screen);
		_this.grade7ShapesGroup.add(_this.bgGraphicAlg11);
		_this.grade7ShapesGroup.add(_this.GMLA_5_ScreenTxt);

		_this.grade7ShapesGroup.add(_this.GMLA_6_Screen);
		_this.grade7ShapesGroup.add(_this.bgGraphicInt12);
		_this.grade7ShapesGroup.add(_this.GMLA_6_ScreenTxt);


	},

	addgrade7MensurationTopic: function () {
		_this.topicTxtBg = _this.add.graphics(100, 60);
		_this.topicTxtBg.lineStyle(0, 0xFFFFFF, 2);
		_this.topicTxtBg.beginFill(0x139487, 1);
		_this.topicTxtBg.drawRoundedRect(0, 0, 210, 100, 10);
		_this.topicTxtBg.boundsPadding = 0;

		_this.topicTitleText = this.add.text(205, 85, ' \n ' + window.selctedLang.mensurationTitle + ' \n ');
		_this.topicTitleText.anchor.setTo(0.5);
		_this.topicTitleText.align = 'center';


		_this.topicTitleText.font = 'gradefont';
		_this.topicTitleText.fontSize = 26;
		_this.topicTitleText.fontWeight = 'normal';
		_this.topicTitleText.fill = 'white';

		_this.topicTitleText.wordWrap = true;
		_this.topicTitleText.wordWrapWidth = 500;
		
		_this.topicBg = _this.add.graphics(75, 100);
		_this.topicBg.lineStyle(0, 0xFFFFFF, 0.8);
		_this.topicBg.beginFill(0x139487, 1);
		_this.topicBg.drawRoundedRect(0, 0, 805, 200, 30);
		_this.topicBg.boundsPadding = 0;

		if (window.languageSelected == "Hindi") {
			
		}
		else if (window.languageSelected == "Kannada") {
		
		}
		else {
			
		}

	

	},

	amplifyMedia: function (mediaElem, multiplier) {
		var context = new (window.AudioContext || window.webkitAudioContext),
			result = {
				context: context,
				source: context.createMediaElementSource(mediaElem),
				gain: context.createGain(),
				media: mediaElem,
				amplify: function (multiplier) { result.gain.gain.value = multiplier; },
				getAmpLevel: function () { return result.gain.gain.value; }
			};
		result.source.connect(result.gain);
		result.gain.connect(context.destination);
		result.amplify(multiplier);

		return result;
	},

	stopDemoVoice: function () {
		if (_this.playQuestionSound) {
			if (_this.playQuestionSound.contains(_this.src)) {
				_this.playQuestionSound.removeChild(_this.src);
				_this.src = null;
			}
			if (!_this.playQuestionSound.paused) {
				_this.playQuestionSound.pause();
				_this.playQuestionSound.currentTime = 0.0;
			}
			_this.playQuestionSound = null;
			_this.src = null;
		}
	},
	shutdown: function () {
		if (_this.mc) {
			_this.mc.get('swipe').set({ direction: Hammer.DIRECTION_ALL, enable: false });
		}
		document.removeEventListener("online", _this.syncTelFunc, false);

		if (this.video) {
			this.video.destroy();
			this.video.removeVideoElement();
			this.video = null;
		}

		if (this.video1) {
			this.video1.destroy();
			this.video1.removeVideoElement();
			this.video1 = null;
		}
		if (this.video2) {
			this.video2.destroy();
			this.video2.removeVideoElement();
			this.video2 = null;
		}
		if (this.video3) {
			this.video3.destroy();
			this.video3.removeVideoElement();
			this.video3 = null;
		}
	},

	convertTimeinMinandSectoHrsMinsSecs: function (Hours1, Minutes1, Seconds1) {
		console.log("inside convert time", Hours1, Minutes1, Seconds1);

		const totalMinutes = Math.floor((parseInt(Seconds1) + parseInt(_this.timeInSeconds)) / 60) + (parseInt(Minutes1) + parseInt(_this.timeInMinutes));
		const Seconds2 = (parseInt(Seconds1) + parseInt(_this.timeInSeconds)) % 60;

		const Hours2 = Math.floor(totalMinutes / 60) + parseInt(Hours1);
		const Minutes2 = totalMinutes % 60;

		console.log("before adding");
		console.log("totalMinutes", totalMinutes);
		console.log("after adding");
		console.log("Seconds2", Seconds2);
		console.log("Hours2", Hours2);
		console.log("Minutes2", Minutes2)

		var save_assessment = {
			game_id: _this.game_id,
			totalLearningTimeinHrs: Hours2.toString(),
			totalLearningTimeinMins: Minutes2.toString(),
			totalLearningTimeinSecs: Seconds2.toString(),
		}
		console.log("save assessment", save_assessment);
		if (_this.userHasPlayed == 1) {
			BBplusplusdbDetails.updateRecordsUsingGameID(save_assessment);
		}

	}
};