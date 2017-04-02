import React from 'react'
import { Drawer } from 'material-ui'
import MiniPlayer from './MiniPlayer'

const drawerStyle = {
  height: 'calc(100vh - 64px)',
  top:'64px',
  overflowY:'hidden'
};
 const NowPlayingDrawer = (props) => {
  return (
    <Drawer
      {...props}
      containerStyle={drawerStyle}
      docked={false}
      openSecondary
    >
      <MiniPlayer {...props} />
    </Drawer>
  );
}
export default NowPlayingDrawer;
