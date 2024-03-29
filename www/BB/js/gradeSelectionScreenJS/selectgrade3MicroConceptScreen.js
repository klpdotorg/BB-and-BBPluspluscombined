Game.selectgrade3MicroConceptScreen=function(){

};

Game.selectgrade3MicroConceptScreen.prototype={

	game:null,
	selected:false,

	init:function()
	{

		if(app.cordova)
		{
			if(navigator.connection.type!="none" && navigator.connection.type!="unknown" && navigator.connection.type!=null && navigator.connection.type!="undefined")
			{
				//absdsjsapi.syncTelemetryData();
			}
			document.addEventListener("online", this.syncTelFunc, false);
		}
	},
			
	syncTelFunc:function()
	{
		if(navigator.connection.type!="none" && navigator.connection.type!="unknown" && navigator.connection.type!=null && navigator.connection.type!="undefined")
		{
			//absdsjsapi.syncTelemetryData();
		}
	},

	create:function(game){		

		
		nativeApp.screenViewStringPass("Practice_topic_selection_screen","grade3MicroConceptScreen");

		this.game = game;

		selectgrade3MicroConcept = true;

		selectgrade1MicroConcept = false;
		selectgrade2MicroConcept = false;
		selectgrade4MicroConcept = false;
		selectgrade5MicroConcept = false;

		if(grade3NumberSenseSelected)
		{
			this.state.start('grade3NumberSense',true,false);
		}
		else if(grade3NumberOperationSelected)
		{
			this.state.start('grade3NumberOperation',true,false);
		}
		else if(grade3MeasurementSelected)
		{
			this.state.start('grade3Measurement',true,false);
		}
		else if(grade3ShapesSenseSelected)
		{
			this.state.start('grade3Shapes',true,false);
		}
		else
		{

			app.gradeScreen = true;

			game.input.enabled = true;

			this.gradeTree = [];

			this.gradeTreeTxt = [];

			this.gameArray = [];

			gradeScreen = true;
			this.background = game.add.tileSprite(0,0,game.world.width,game.world.height,'McBg');
			
			this.gradeBackBtn = game.add.sprite(-5,3,'gradeSceneBackBtn');
			this.gradeBackBtn.inputEnabled = true;
			this.gradeBackBtn.input.useHandCursor = true;
			this.gradeBackBtn.events.onInputDown.add(function(){

				this.clickSound = _this.add.audio('ClickSound');
	        	this.clickSound.play();
				selectgrade3MicroConcept = false;
				game.state.start('gradeSelectionScreen',true,false);

			},this);

			this.gameModeShareBtn = game.add.image(920,20,'shareIcon');
        		this.gameModeShareBtn.anchor.setTo(0.5);
        		this.gameModeShareBtn.scale.setTo(0.8);
        		this.gameModeShareBtn.inputEnabled = true;
        		this.gameModeShareBtn.input.useHandCursor = true;
        		this.gameModeShareBtn.events.onInputDown.add(function()
        		{
        			this.clickSound = this.add.audio('ClickSound');
                	this.clickSound.play();
        			//if(appConfig.cordova && !appConfig.browser)
        			//{
        				nativeApp.ShareApp();
        			//}

        		},this);

			this.microConceptTopics(game,150,220,window.selctedLang.McTopicText1,"NUMBER SENSE","tree1",0);
			this.microConceptTopics(game,380,320,window.selctedLang.McTopicText2,"NUMBER OPERATIONS","tree2",1);
			this.microConceptTopics(game,600,220,window.selctedLang.McTopicText5,"MEASUREMENT","tree3",2);
			this.microConceptTopics(game,820,320,window.selctedLang.McTopicText3,"SHAPES","tree4",3);

		}
		
	},

	microConceptTopics:function(game,x,y,lang,name,key,arrIndex)
	{
		//this.gradeTree[arrIndex] = game.add.sprite(x,y,key);
		this.gradeTree[arrIndex] = game.add.sprite(x,y,'MicroConceptTree');

		this.gradeTree[arrIndex].anchor.setTo(0.5);
		this.gradeTree[arrIndex].scale.setTo(1.3);
		this.gradeTree[arrIndex].name = name;
		this.gradeTree[arrIndex].frame = arrIndex;
		this.gradeTree[arrIndex].inputEnabled = true;
		this.gradeTree[arrIndex].input.useHandCursor = true;
		this.gradeTree[arrIndex].events.onInputDown.add(this.topicSelected,this);


		this.gradeTreeTxt[arrIndex] = this.add.text(x, y-40, ' \n '+lang+' \n ');
		this.gradeTreeTxt[arrIndex].anchor.setTo(0.5);
		this.gradeTreeTxt[arrIndex].align = 'center';
		
		this.gradeTreeTxt[arrIndex].fontSize = 22;
		this.gradeTreeTxt[arrIndex].fontWeight = 'normal';
		this.gradeTreeTxt[arrIndex].fill = '#FFFFFF';

		this.gradeTreeTxt[arrIndex].wordWrap = true;
		this.gradeTreeTxt[arrIndex].wordWrapWidth = 500;
		
	},
	
	onMouseOver:function(target)
	{
		
		
	},
	
	topicSelected:function(target)
	{
					
        this.clickSound = _this.add.audio('ClickSound');
        this.clickSound.play();

        
		if(target.name=="NUMBER SENSE")
		{
			this.state.start('grade3NumberSense',true,false);
		}
		else if(target.name=="MEASUREMENT")
		{
			this.state.start('grade3Measurement',true,false);
		}
		else if(target.name=="SHAPES")
		{
			this.state.start('grade3Shapes',true,false);
		}
		else
		{
			this.state.start('grade3NumberOperation',true,false);
		}
	},

	checkDownload:function(dirPath,stateName,url,target,_this)
	{

		window.resolveLocalFileSystemURL(dirPath, 
			function(){
				//alert("scucess");
				_this.state.start(stateName,true,false);
				return true;
			}, 
			function(){
				//alert("failure");
				_this.downloadTheFile(url,target);
				return false;
			});
	},


	confirmation:function(url,target)
	{
		var retVal = confirm("Abort previous download and Download this files?");
               if( retVal == true ){

               		if(downloader && this.downloading)
               			downloader.abort();

               	 this.downloadTheFile(url,target);
                  return true;
               }
               else{
               	//console.log("denied");
               	//don nothing, continue.
                  //document.write ("User does not want to continue!");
                  return false;
              }
	},

	checkDirExistsorNot:function(dirPath,target)
	{
		////alert(dirPath);
		window.resolveLocalFileSystemURL(dirPath, 
			function(){
				//alert("scucess");
				target.frame = 0;
				return true;
			}, 
			function(){
				//alert("failure");
				target.frame = 1;
				return false;
			});
	},

	downloadTheFile:function(url,target)
	{

		var _this = this;
		////alert("here download");

		var initialized = function (event) {
	        downloader.get(url);
	        event.target.removeEventListener(event.name, initialized);
	    };

	    document.addEventListener('DOWNLOADER_initialized', initialized);

	    	downloader.init({
	        folder: 'www',
	        fileSystem: window.directoryPath,
	        unzip: true,
	        check: false,
	        noMedia: true,
	        wifiOnly: false,
	        delete: true
	    });


		this.downlodPopupGrp.visible = true;
		
		document.addEventListener("DOWNLOADER_downloadProgress", function(event){
		  var data = event.data;
		  //console.log(data);
		 // _this.downloading = true;
		 	_this.downloadTxt.setText("Downloading.... \n "+data[0]+"%");
		});


		document.addEventListener("DOWNLOADER_downloadError", function(event){
		  var data = event.data;
		  //console.log(data);
		  _this.downlodPopupGrp.visible = false;
		  alert("Download Failed please try again");
		  //_this.game.input.enabled = true;
		});

		document.addEventListener("DOWNLOADER_downloadSuccess", function(event){
		  var data = event.data;
		  //console.log(data);
		  //location.reload(); 
		});

		document.addEventListener("DOWNLOADER_unzipProgress", function(event){
		  var data = event.data;
		  //console.log(data);
		  //_this.downloading = true;
		  _this.downloadTxt.setText("Unzipping.... \n "+data[0]+"%");
		});

		document.addEventListener("DOWNLOADER_unzipSuccess", function(event){
		  var data = event.data;
		  //console.log(data);
		  //target.frame = 0;
		  //_this.downloading = false;

		  _this.downlodPopupGrp.visible = false;

		  location.reload(); 
		  
		});

		document.addEventListener("DOWNLOADER_unzipError", function(event){
		  var data = event.data;
		  //console.log(data);
		  //alert("Error while unZipping");
		  _this.downlodPopupGrp.visible = false;
		  //alert("Download Failed please try again");
		  //_this.game.input.enabled = true;
		});
	},

	setDownloadComplete:function(target)
	{
		if(target.name=="NUMBER SENSE")
		{
			this.numberSense1Downloaded = true;
		}
		else if(target.name=="MEASUREMENT")
		{
			this.measurement1Downloaded = true;
		}
		else if(target.name=="NUMBER OPERATIONS")
		{
			this.numperoperation1Downloaded = true;
		}
	},



	confirmReload:function()
	{
			var retVal = confirm("Download complete do you want to reload the game?");
               if( retVal == true ){
               	  location.reload(); 
                  //return true;
               }
               else{
               	
                  //return false;
              }
	},
	
	shutdown:function()
	{
		if(app.cordova)
			document.removeEventListener("online", _this.syncTelFunc, false);

	}
	
};