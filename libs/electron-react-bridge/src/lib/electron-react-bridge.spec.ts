import { electronReactBridge } from './electron-react-bridge';

describe('electronReactBridge', () => {
  it('should work', () => {
    expect(electronReactBridge()).toEqual('electron-react-bridge');
  });
});
