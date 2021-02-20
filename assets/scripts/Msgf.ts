import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Msgf')
export class Msgf extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;

    start () {
        // Your initialization goes here.
    }

    onEnable(){
        const self = this;
        setTimeout(()=>{
            self.node.active = false;
        },1000)
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
