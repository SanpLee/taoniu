import { _decorator, Component, Node, find, AudioSource,Button  } from 'cc';
const { ccclass, property } = _decorator;
import { httpRequest, getQueryString, appToken, pubUrl} from "./Commm"
import { Gesture } from "./Gesture";
import { CountDown } from './CountDown';
@ccclass('Permanent')
export class Permanent extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;
    @property({type: Gesture})
    public Gesture: Gesture = null;

    @property({type: CountDown})
    public CountDown: CountDown = null;

    //
    //public cowToken:string = '';

    //兑换绳子数量
    public ropeCount:number = 1;

    //游戏音频全局状态
    public musicStatus = true;


    onLoad(){
        

        
    }
    

    start () {
        // Your initialization goes here.
       find("ConversionRope").active = true;
       
    }


    // getCowToken(val:string){
    //     this.cowToken = val
    // }

    getRopeCount(val:string){
        this.ropeCount = Number(val);
    }

    init(){
        
        //find("Run").active = false;
        //find("Manager/ButtonStart").active = true;
        //find("Manager/ButtonStart").getComponent(Button).interactable = true;
        find("ConversionRope").active = true;
        //find("Manager/Rope").active = true;
        this.CountDown.init();
    }

    //退出游戏  
    exitGame(){
        let url = "";
        let dy = "/activity/20201230";
        // if(tokenExpires){
        //     dy = "/user";
        // }
        if(getQueryString('device') == 'wap'){
            url = pubUrl.domain + dy;
        }else{
            url = pubUrl.domain + dy + '?token=' + getQueryString('token');
        }
        window.location.href = url;
    }

     

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
