import { _decorator, Component, Event, Node, ToggleContainer, EventHandler, find,ToggleComponent, Button, Label, Toggle} from 'cc';
const { ccclass, property } = _decorator;
//import axios from "./axios";
import { httpRequest, getQueryString,appToken, pubUrl} from "./Commm"
import { Permanent } from './Permanent';
@ccclass('ConversionRope')
export class ConversionRope extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;
    @property({type: Permanent})
    public Permanent: Permanent = null;
    //选择绳子数量
    public ropeCount = '1';

    //用户可使用的绳子数量
    private userRope = 0;

    onLoad(){
        //this.ropeCount = '1';
        //this.Permanent.getRopeCount('1');
        for(let i = 0; i < find("wall/content", this.node).children.length; i++){
            const containerEventHandler = new EventHandler();
            containerEventHandler.target = find("wall/content", this.node).children[i]; // 这个 node 节点是你的事件处理代码组件所属的节点
            containerEventHandler.component = 'ConversionRope';// 这个是代码文件名
            containerEventHandler.handler = 'callback';
            containerEventHandler.customEventData = 'foobar';
            const container = find("wall/content", this.node).children[i].getComponent(ToggleComponent);
            container.checkEvents.push(containerEventHandler);
        }

        const clickEventHandlerSubmit = new EventHandler();
        clickEventHandlerSubmit.target = find("wall/suButtom", this.node); // 这个 node 节点是你的事件处理代码组件所属的节点
        clickEventHandlerSubmit.component = 'ConversionRope';// 这个是代码文件名
        clickEventHandlerSubmit.handler = 'callbackSub';
        clickEventHandlerSubmit.customEventData = 'customEventData';
        const button = find("wall/suButtom", this.node).getComponent(Button);
        button.clickEvents.push(clickEventHandlerSubmit);  
    }

    start () {
        
        // Your initialization goes here.
        //this.init();
    }

    onEnable(){
        const that = this;

        //初始化checkbox
        this.selRope('1');
        find("ConversionRope/wall/content").children[0].getComponent(Toggle).isChecked = true;

        find("ConversionRope/wall/suButtom").getComponent(Button).interactable = true;
        // find("Loading").active = true;
        // httpRequest.Get('/cowActivity/activityInfo',{appToken:appToken},function(res) {
        //     //console.log(res);
        //     find("Loading").active = false;
        //     if(res.code == 'success'){
        //         that.userRope = Number(res.data.ropeNum);
        //         find("wall/Integral/leftNum", that.node).getComponent(Label).string = res.data.integral;
        //         let ropeNum = res.data.ropeNum;
        //         if(res.data.ropeNum > 99){
        //             ropeNum = '99+';
        //         }
                
        //         find("wall/Integral/rightNum", that.node).getComponent(Label).string = ropeNum;

        //         //活动未开始或已结束
        //         if(res.data.game != 1){
        //             find("Msgf").active = true;
        //             let msg = '';
        //             if(res.data.game == 2){
        //                 msg = '活动未开始';
        //             }else{
        //                 msg = '活动已结束';
        //             }
        //             find("Msgf/box/Label").getComponent(Label).string = msg;
                    
        //             setTimeout(()=>{
        //                 that.Permanent.exitGame();
        //             },2000)
                    
                    
        //             return;
        //         }else{
                    
        //         }

        //     }else{

        //         that.msgTip(res.message, res.code);
        //     }
        // });
        
        find("wall/Integral/leftNum", that.node).getComponent(Label).string = '99999';
        find("wall/Integral/rightNum", that.node).getComponent(Label).string = '100';
    }

    onDisable(){
        find("Run").active = true;
        find("BtnInt").active = true;
    }    

    //选择绳套数量
    callbackAddRope(event: Event, customEventData: string){
        console.log(customEventData)
        //this.ropeCount = customEventData;
        //this.Permanent.getRopeCount(customEventData);
        this.selRope(customEventData);
        //这里 event 是一个 Touch Event 对象，你可以通过 event.target 取到事件的发送节点
        // 这里的 customEventData 参数就等于之前设置的 'foobar'
    }
    callbackSub(event: Event, customEventData: string){
        const that = this;
        //this.btnFlag = false;
        find("ConversionRope/wall/suButtom").getComponent(Button).interactable = false;
        //find("Loading").active = true;
        console.log("兑换绳子数量："+ this.ropeCount)
        // httpRequest.Get('/cowActivity/userExistRope',{appToken:appToken},function(resUserExistRope) {
        //     //console.log(resUserExistRope);
        //     find("Loading").active = false;
            
        //     if(resUserExistRope.code == 'success'){
        //         if(resUserExistRope.data.ropeCount > 0){
        //             console.log('兑换失败，有未使用的绳子数量：'+resUserExistRope.data.ropeCount)
        //             //that.ropeCount = resUserExistRope.data.ropeCount;
        //             //that.Permanent.getRopeCount(resUserExistRope.data.ropeCount);

        //             that.selRope(resUserExistRope.data.ropeCount);

        //             find("Msgf").active = true;
        //             find("Msgf/box/Label").getComponent(Label).string = '有未使用的绳子';
                    
                    
        //             setTimeout(()=>{
        //                 that.node.active = false;
        //                 find("Manager/ButtonStart").active = true;
        //             },1000)
                    
        //         }else{
        //             if(Number(resUserExistRope.data.ropeCount) > that.userRope ){
        //                 find("Msgf").active = true;
        //                 find("Msgf/box/Label").getComponent(Label).string = '积分不足';
        //                 find("ConversionRope/wall/suButtom").getComponent(Button).interactable = true;
        //             }else{
        //                 const params = {
        //                     count:that.ropeCount
        //                 }
        //                 find("Loading").active = true;
        //                 httpRequest.Post('/cowActivity/exchangeRope?appToken='+appToken,params,function(res) {
        //                     //console.log(res);
        //                     find("Loading").active = false;
                            
        //                     if(res.code == 'success'){        
        //                         console.log("兑换成功绳子数量：" + res.data.ropeCount)
        //                         //that.Permanent.getRopeCount(res.data.ropeCount);
        //                         that.selRope(that.ropeCount);   
        //                         find("Msgs").active = true;
        //                         find("Msgs/box/Label").getComponent(Label).string = '兑换成功';
        //                         setTimeout(()=>{ 
        //                             that.node.active = false;
        //                             find("Manager/ButtonStart").active = true;
        //                         },1000)
                                        
        //                     }else{
                                 
        //                         that.msgTip(res.message, res.code);
        //                     }
                            
        //                 });
        //             }    
        //         }
        //     }else{
        //         //alert(res.message);
        //         that.msgTip(resUserExistRope.message, resUserExistRope.code);
        //     }
        // });
        //that.selRope(that.ropeCount);   
        find("Msgs").active = true;
        find("Msgs/box/Label").getComponent(Label).string = '兑换成功';
        setTimeout(()=>{ 
            that.node.active = false;
            find("Manager/ButtonStart").active = true;
        },1000)
    }

    private msgTip(msg, code){
        const self = this;
        find("Msgf").active = true;
        find("Msgf/box/Label").getComponent(Label).string = msg;
        find("ConversionRope/wall/suButtom").getComponent(Button).interactable = true; 

        if(code == 'GLOABLE_000001'){
            setTimeout(()=>{
                self.Permanent.exitGame();
            },2000)
        }
        
    }

    private selRope(val:string){
        this.ropeCount = val;
        this.Permanent.getRopeCount(val);
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
