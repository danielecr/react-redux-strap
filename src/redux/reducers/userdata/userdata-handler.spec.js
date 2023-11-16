import { userdataHandler } from './userdata-handler';
import * as actionTypes from '../../../actionTypes';

const ofSpy = function() {
    this.calls = [];
    this.of = (...args) => this.calls.push(args);
    this.getCallsN = ()=> this.calls.length
    this.getDetails = ()=> this.calls;
}

it('should call of once', () => {
    let ofspy = new ofSpy();
    const ajaxResult = {response:{unexpectedkey:"value"}};
    userdataHandler(ofspy.of)(ajaxResult, {type:'actiontype'}, {value:{userdata:"value"}});
    expect(ofspy.getCallsN()).toBe(1);
    const firstCallParams = ofspy.getDetails()[0];
    expect(firstCallParams[0].type).toBe(actionTypes.USERDATA_LOAD_SUCCESS);
    expect(firstCallParams[0].payload).toBe(ajaxResult.response);
    //console.log(ofspy.getCallsN(), ofspy.getDetails());
})
