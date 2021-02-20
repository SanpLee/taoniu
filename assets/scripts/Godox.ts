import { _decorator, Component, Node,find } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Godox')
export class Godox extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;

    start () {
        // Your initialization goes here.
    }

    godoxEnd1(){
        find("AlertBox/Layout/wall/sCow").active = true;
    }
    godoxEnd2(){
        this.node.active = false;
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
