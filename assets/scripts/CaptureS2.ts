import { _decorator, Component, Node, Animation, loader, SpriteFrame, AnimationClip, Sprite, Label,find,AudioSource } from 'cc';
//import { ColliderChecker } from './ColliderChecker';
const { ccclass, property } = _decorator;
import { PlayBtn } from './PlayBtn';
import { Permanent } from './Permanent';
import { AlertResult } from './AlertResult';
import { StartBtn } from './StartBtn';
import { httpRequest, getQueryString,appToken, pubUrl} from "./Commm"

@ccclass('CaptureS2')
export class CaptureS2 extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;
    @property({type: PlayBtn})
    public PlayBtn: PlayBtn = null;

    @property({type: Permanent})
    public Permanent: Permanent = null;

    @property({type: StartBtn})
    public StartBtn: StartBtn = null;

    @property({type: AlertResult})
    public AlertResult: AlertResult = null;

    @property({type: Node})
    public Fail: Node = null;

    //public redBox:[] = [];
    public _clicks:number = 200;

    //套中的牛编号
    public cowsArr:[] = [];

    //public cowToken = ''

    onLoad(){
        
        
    }

    start () {
        // Your initialization goes here.
        
    }

    onEnable(){
        
        //this._clicks = this.PlayBtn.clicks;
        this.cowsArr = [];
        //console.log('点击次数：'+ this._clicks)    
        
        const _captureArr:[] = this.StartBtn.captureArr;
        //let _lenArr = [];

        //初始化关闭所有子节点
        for(let i = 0; i < this.node.children.length; i++ ){
            this.node.children[i].active = false;
            for(let j = 0; j < this.node.children[i].children.length; j++ ){
                // find("cry/body", this.node.children[i]).getComponent(Sprite).spriteFrame = null;
                // find("cry/head", this.node.children[i]).getComponent(Sprite).spriteFrame = null;
                // find("laugth", this.node.children[i]).getComponent(Sprite).spriteFrame = null;
                this.node.children[i].children[j].active = false;
            }
        }

        if(this._clicks > 10){

            for(let i = 0; i < _captureArr.length; i++){
                if(_captureArr[i] == 1 && (this._clicks > 10 || this._clicks  == 10)){
                    this.cowsArr.push(_captureArr[i] );
                }else if(_captureArr[i] == 2 && (this._clicks > 25 || this._clicks  == 25)){
                    this.cowsArr.push(_captureArr[i] );
                }else if(_captureArr[i] == 3 && (this._clicks > 40 || this._clicks  == 40)){
                    this.cowsArr.push(_captureArr[i] );
                }else if(_captureArr[i] == 4 && (this._clicks > 55 || this._clicks  == 55)){
                    this.cowsArr.push(_captureArr[i] );
                }else if(_captureArr[i] == 5 && (this._clicks > 70 || this._clicks  == 70)){
                    this.cowsArr.push(_captureArr[i] );
                }else if(_captureArr[i] == 6 && (this._clicks > 85 || this._clicks  == 85)){
                    this.cowsArr.push(_captureArr[i] );
                }else if(_captureArr[i] == 7 && (this._clicks > 100 || this._clicks  == 100)){
                    this.cowsArr.push(_captureArr[i] );
                }else if(_captureArr[i] == 8 && (this._clicks > 115 || this._clicks  == 115)){
                    this.cowsArr.push(_captureArr[i] );
                }else if(_captureArr[i] == 9 && (this._clicks > 130 || this._clicks  == 130)){
                    this.cowsArr.push(_captureArr[i] );
                }else if(_captureArr[i] == 10 && (this._clicks > 145 || this._clicks  == 145)){
                    this.cowsArr.push(_captureArr[i] );
                }
                // else{
                //     _len = _captureArr.length;
                // }
                
            }
            //console.log("得到的红包：")
            //console.log(this.cowsArr)
            //console.log("-----------------------")
        }

        
        const _newCaptureArr = this.StartBtn.captureArr.reverse();
        const lenVal = _newCaptureArr.length - this.cowsArr.length;
        let _newCowsArr:number[] = JSON.parse(JSON.stringify(this.cowsArr));

        //console.log("==============:"+this.cowsArr)
        
        if(lenVal != 0){
            for(let k = 0; k < lenVal; k++){
                _newCowsArr.push(-1)
            } 
        }

        _newCowsArr = _newCowsArr.reverse();
        
        for(let i = 0; i < _newCaptureArr.length; i++){
            this.node.getChildByName('Rope-0').active=true;
            find("cry/rope", this.node.children[i]).active = true;

            //隐藏绳把手
            if(this.cowsArr.length == 0){
                this.node.getChildByName('Rope-0').active=false;
            }

            //console.log(_newCaptureArr[i] +":"+ _newCowsArr[i])
            if(_newCaptureArr[i] == _newCowsArr[i]){
                //console.log('cry')
                this.node.children[i].active = true;
                this.node.children[i].getChildByName("cry").active = true;
                this.node.children[i].getChildByName("bg").active = true;
                const animationComponent = find("cry/head", this.node.children[i]).getComponent(Animation);
                loader.loadResDir("capture-s2/c"+ _newCaptureArr[i] +"/cry/head", SpriteFrame, function (err:any, assets:[], urls:string) {
                    //console.log(assets)
                    const clip = AnimationClip.createWithSpriteFrames(assets, 8);
                    clip.wrapMode= AnimationClip.WrapMode.Loop;
                    clip.name = 'an' + new Date().getTime();
                    animationComponent.clips=[clip]
                    animationComponent.play(clip.name); 
                });
                loader.loadRes("capture-s2/c"+ _newCaptureArr[i] +"/cry/c000/spriteFrame", SpriteFrame ,(err: any, spriteFrame: SpriteFrame) => {
                    //console.log(spriteFrame)
                    //this.node.children[i].getChildByName('body')
                    find("cry/body", this.node.children[i]).getComponent(Sprite).spriteFrame = spriteFrame;
                });
            }else{
                //console.log('laugth')
                this.node.children[i].active = true;
                this.node.children[i].getChildByName("laugth").active = true;
                this.node.children[i].getChildByName("bg").active = true;
                const animationComponent = find("laugth", this.node.children[i]).getComponent(Animation);
                loader.loadResDir("capture-s2/c"+ _newCaptureArr[i] +"/laugth", SpriteFrame, function (err:any, assets:[], urls:string) {
                    //console.log(assets)
                    const clip = AnimationClip.createWithSpriteFrames(assets, 8);
                    clip.wrapMode= AnimationClip.WrapMode.Loop;
                    clip.name = 'an' + new Date().getTime();
                    animationComponent.clips=[clip]
                    animationComponent.play(clip.name); 
                });
            }

            this.node.children[i].getChildByName('bg').children[0].getComponent(Label).string = _newCaptureArr[i];  
        }

        const that = this;
        if(that._clicks < 10 || that.cowsArr.length == 0){
            if(this.Permanent.musicStatus){
                find("AudioLaugth").getComponent(AudioSource).play();
            }
        }else{
            if(this.Permanent.musicStatus){
                find("AudioCry").getComponent(AudioSource).play();
            }
        }


        setTimeout(()=>{
            
            that.node.active = false;
            
            //console.log(that._clicks +":-----:"+ that.cowsArr.length)
            //find("Loading").active = true;
            // httpRequest.Get('/cowActivity/go',{appToken:appToken},function(resGo) {
            //     console.log(resGo);
            //     find("Loading").active = false;
            //     if(resGo.code == 'success'){
            //         const params = {
            //             clickTimes:that._clicks,
            //             cowList:that.cowsArr,
            //             cowToken:resGo.data.cowToken
            //         }
            //         if(that._clicks < 10 || that.cowsArr.length == 0){
                        
            //             //find("Loading").active = true;
                        
            //             // httpRequest.Post('/cowActivity/cowResult?appToken='+appToken,params,function(res) {
            //             //     find("Loading").active = false;
            //             //     if(res.code == 'success'){
            //             //         that.Fail.active = true;
            //             //     }else{
            //             //         that.msgTip(res.message, res.code); 
            //             //     }
            //             // });
            //             //that.Fail.active = true;
            //         }else{
            //             //find("Loading").active = true;
            //             // httpRequest.Post('/cowActivity/cowResult?appToken='+appToken,params,function(res) {
            //             //     //console.log(res);
            //             //     find("Loading").active = false;
            //             //     if(res.code == 'success'){
            //             //         that.AlertResult.init(res);
            //             //         find("AlertBox").active = true;
            //             //     }else{
            //             //         that.msgTip(res.message, res.code); 
            //             //     }     
            //             // });
                        
            //         }

            //     }else{                   
            //         find("Loading").active = false;

            //         that.msgTip(resGo.message, resGo.code);

                    
            //     }
                
            // });
            that.AlertResult.init({
                "code": "",
                "data": {
                    "cowList": [
                        {
                            "cowId": 0,
                            "cowRedAmount": 10000,
                            "doubled": true,
                            "validDate": "20200220"
                        },
                        {
                            "cowId": 0,
                            "cowRedAmount": 10000,
                            "doubled": false,
                            "validDate": "20200220"
                        },
                        {
                            "cowId": 0,
                            "cowRedAmount": 10000,
                            "doubled": false,
                            "validDate": "20200220"
                        },
                        {
                            "cowId": 0,
                            "cowRedAmount": 10000,
                            "doubled": false,
                            "validDate": "20200220"
                        },
                        {
                            "cowId": 0,
                            "cowRedAmount": 10000,
                            "doubled": false,
                            "validDate": "20200220"
                        },
                    ],
                    "superCowAmount": 188800,
                    "superCowValidDate": "20200220"
                },
                "message": ""
                
            });
            find("AlertBox").active = true;
            //
        },2000)
        
    }

    onDisable(){
        //未被捕获的牛群消失
        find("UnCapture").active = false;
        find("Manager/ButtonPlay").active = false;
    }

    private msgTip(msg, code){
        const self = this;
        find("Msgf").active = true;
        find("Msgf/box/Label").getComponent(Label).string = msg;
        if(code == 'GLOABLE_000001'){
            setTimeout(()=>{
                self.Permanent.exitGame();
            },2000)
        }else{
            this.Permanent.init(); 
        }
        
    }
}
