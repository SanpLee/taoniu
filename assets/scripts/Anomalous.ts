import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { httpRequest, getQueryString, pubUrl} from "./Commm"
@ccclass('Anomalous')
export class Anomalous extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;

    start () {
        let url = "";
        if(getQueryString('device') == 'wap'){
            url = pubUrl.domain + "/activity/20201230";
        }else{
            url = pubUrl.domain + '/activity/20201230?token=' + getQueryString('token');
        }
        window.location.href = url;
    }

    
    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
