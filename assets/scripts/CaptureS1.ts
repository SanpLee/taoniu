import { _decorator, Component, Node, Animation, loader, SpriteFrame, AnimationClip, Sprite, Label} from 'cc';
const { ccclass, property } = _decorator;
import { Permanent } from './Permanent';

@ccclass('CaptureS1')
export class CaptureS1 extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;
    
    @property({type: Permanent})
    public Permanent: Permanent = null;


    onLoad(){
        //console.log(this.ColliderChecker._value())
        //this.node.active = false;
        //console.log(this.arrdd)
         
         
        
    }

    start () {
        // Your initialization goes here.
 
    }

    onEnable(){
        
    }

    init(arr){
        this.node.active = true;
        console.log(this.Permanent.ropeCount)
        for(let i = 0; i < this.node.children.length; i++ ){
            
            
            this.node.children[i].active = false;
        }
        //this.node.active = true;

        this.node.getChildByName('Rope-0').active=true;
        const num = Number(this.Permanent.ropeCount);
        if(num == 1){
            this.node.children[1].active = true;
            //const _node = find("Capture-00"+ i+1 +"/head", this.node)
            //console.log(this.node.children[1].getChildByName('head').getComponent(Animation))
            const animationComponent =this.node.children[1].getChildByName('head').getComponent(Animation);
            
            loader.loadResDir("capture-s1/c"+ arr[0] +"/h", SpriteFrame, function (err:any, assets:[], urls:string) {
                //console.log(assets)
                const clip = AnimationClip.createWithSpriteFrames(assets, 8);
                
                clip.wrapMode= AnimationClip.WrapMode.Loop;
                //animationComponent.createState(clip);
                clip.name = 'an' + new Date().getTime();
                 
                
                //animationComponent.defaultClip = clip;
                //animationComponent.playOnLoad =true;
                //console.log(animationComponent.clips)
                animationComponent.clips=[clip]
                animationComponent.play(clip.name); 
            });
            loader.loadRes("capture-s1/c"+ arr[0] +"/c000/spriteFrame", SpriteFrame ,(err: any, spriteFrame: SpriteFrame) => {
                //console.log(spriteFrame)
                this.node.children[1].getChildByName('body').getComponent(Sprite).spriteFrame = spriteFrame;
            });
            this.node.children[1].getChildByName('bg').children[0].getComponent(Label).string = arr[0];
        }else if(num == 2){
            this.node.children[0].active = true;
            

            //--------------------1
            const animationComponent1 =this.node.children[0].getChildByName('head').getComponent(Animation);
            loader.loadResDir("capture-s1/c"+ arr[0] +"/h", SpriteFrame, function (err:any, assets:[], urls:string) {
                //console.log(assets)
                const clip = AnimationClip.createWithSpriteFrames(assets, 8);
                clip.wrapMode= AnimationClip.WrapMode.Loop;
                clip.name = 'an' + new Date().getTime();
                //animationComponent1.defaultClip = clip;
                //animationComponent1.playOnLoad =true;
                animationComponent1.clips=[clip]
                animationComponent1.play(clip.name); 
            });
            loader.loadRes("capture-s1/c"+ arr[0] +"/c000/spriteFrame", SpriteFrame ,(err: any, spriteFrame: SpriteFrame) => {
                //console.log(spriteFrame)
                this.node.children[0].getChildByName('body').getComponent(Sprite).spriteFrame = spriteFrame;
            });
            this.node.children[0].getChildByName('bg').children[0].getComponent(Label).string = arr[0];

            //--------------------2
            this.node.children[2].active = true;
            const animationComponent2 =this.node.children[2].getChildByName('head').getComponent(Animation);
            loader.loadResDir("capture-s1/c"+ arr[1] +"/h", SpriteFrame, function (err:any, assets:[], urls:string) {
                //console.log(assets)
                const clip = AnimationClip.createWithSpriteFrames(assets, 8);
                clip.wrapMode= AnimationClip.WrapMode.Loop;
                clip.name = 'an' + new Date().getTime();
                //animationComponent2.defaultClip = clip;
                //animationComponent2.playOnLoad =true;
                animationComponent2.clips=[clip]
                animationComponent2.play(clip.name); 
                
            });
            loader.loadRes("capture-s1/c"+ arr[1] +"/c000/spriteFrame", SpriteFrame ,(err: any, spriteFrame: SpriteFrame) => {
                //console.log(spriteFrame)
                this.node.children[2].getChildByName('body').getComponent(Sprite).spriteFrame = spriteFrame;
            });
            this.node.children[2].getChildByName('bg').children[0].getComponent(Label).string = arr[1];
        }else{
            //动态创建被拉的牛头部动画
            for(let i = 0; i < arr.length; i++){
                //this.node.getChildByName('Rope-0').active=true;
                
                //激活子节点
                this.node.children[i].active = true;
                //const _node = find("Capture-00"+ i+1 +"/head", this.node)
                //console.log(this.node.children[i].getChildByName('head').getComponent(Animation))
                const animationComponent =this.node.children[i].getChildByName('head').getComponent(Animation)
                loader.loadResDir("capture-s1/c"+ arr[i] +"/h", SpriteFrame, function (err:any, assets:[], urls:string) {
                    //console.log(assets)
                    const clip = AnimationClip.createWithSpriteFrames(assets, 8);
                    clip.wrapMode= AnimationClip.WrapMode.Loop;
                    clip.name = 'an' + new Date().getTime();
                    //animationComponent.defaultClip = clip;
                    //animationComponent.playOnLoad =true;
                    animationComponent.clips=[clip]
                    animationComponent.play(clip.name); 
                    //console.log(animationComponent.clips)
                });
                loader.loadRes("capture-s1/c"+ arr[i] +"/c000/spriteFrame", SpriteFrame ,(err: any, spriteFrame: SpriteFrame) => {
                    //console.log(spriteFrame)
                    this.node.children[i].getChildByName('body').getComponent(Sprite).spriteFrame = spriteFrame;
                });
                this.node.children[i].getChildByName('bg').children[0].getComponent(Label).string = arr[i];
                //console.log(this.node.children[i].getChildByName('bg').children[0].getComponent(Label).string)
                
            }
        }
        
        //开始拉牛
        this.node.getComponent(Animation).play('pull');

    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}


