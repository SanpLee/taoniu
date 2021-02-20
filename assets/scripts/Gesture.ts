import { _decorator, Component, Node,Animation } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Gesture')
export class Gesture extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;

    start () {
        // Your initialization goes here.
        this._runAn('Gesture-s1')
    }

    _runAn (sel:string) {
        const animationComponent = this.node.getComponent(Animation);
        animationComponent.play(sel); 

    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
