import { _decorator, Component, Node, Prefab, instantiate, Vec3, CCInteger, v3, loader, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

enum GameState{
    GS_INIT,
    GS_START,
    GS_END,
};



@ccclass('Manager')
export class Manager extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;
     
    public cowArray: Array<any>;

    private _curState: GameState = GameState.GS_INIT;

    onLoad(){
        //资源加载
        // loader.loadResDir("cows", SpriteFrame, function (err, assets, urls) {
        //     // ...
        //     console.log(assets)
        // });
    }



    start () {
        // Your initialization goes here.
        this.curState = GameState.GS_INIT;
 
    }

    set curState (value: GameState) {
        switch(value) {
            case GameState.GS_INIT:
                //this.init();
                break;
            case GameState.GS_START:
               // this.startMenu.active = false;
                //this.stepsLabel.string = '0';   // 将步数重置为0
                // setTimeout(() => {      //直接设置active会直接开始监听鼠标事件，做了一下延迟处理
                //     this.playerCtrl.setInputActive(true);
                // }, 0.1);
                break;
            case GameState.GS_END:
                break;
        }
        this._curState = value;
    }


    

    
    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
