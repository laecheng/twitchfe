import React, { useState } from 'react'
import MenuItem from './MenuItem';
import { Menu, Button, Drawer, message } from 'antd';
import { EyeOutlined, YoutubeOutlined, VideoCameraOutlined, StarFilled } from '@ant-design/icons';
import { getFavoriteItem } from '../utils';

const { SubMenu } = Menu

function Favorites() {
  const [displayDrawer, setDisplayDrawer] = useState(false)
  const [data, setData] = useState({
    VIDEO: [],
    STREAM: [],
    CLIP: [],
  })

  const { VIDEO, STREAM, CLIP } = data

  const onDrawerClose = () => {
    setDisplayDrawer(false)
  }

  const onFavoriteClick = () => {
    getFavoriteItem().then((data) => {
      setData(data)
      setDisplayDrawer(true)
    }).catch((err) => {
      message.error(err.message)
    })
  }

  return (
    <>
      <Button type="primary" shape="round" onClick={onFavoriteClick} icon={<StarFilled />}>
        My Favorites
      </Button>
      <Drawer
        title="My Favorites"
        placement="right"
        width={720}
        visible={displayDrawer}
        onClose={onDrawerClose}
      >
        <Menu
          mode="inline"
          defaultOpenKeys={['streams']}
          style={{ height: '100%', borderRight: 0 }}
          selectable={false}
        >
          <SubMenu key={'streams'} icon={<EyeOutlined />} title="Streams">
            <MenuItem items={STREAM}/>
          </SubMenu>
          <SubMenu key={'videos'} icon={<YoutubeOutlined />} title="Videos">
            <MenuItem items={VIDEO}/>
          </SubMenu>
          <SubMenu key={'clips'} icon={<VideoCameraOutlined />} title="Clips">
            <MenuItem items={CLIP}/>
          </SubMenu>
        </Menu>
      </Drawer>
    </>
  )
}

export default Favorites