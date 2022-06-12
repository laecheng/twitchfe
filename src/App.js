import { Layout, Menu, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { logout, getTopGames } from './utils';
import CustomSearch from './components/CustomSearch';
import { LikeOutlined, FireOutlined } from '@ant-design/icons';
import SubMenu from 'antd/lib/menu/SubMenu';
import TopGames from './components/TopGames';
import PageHeader from './components/PageHeader';

const { Header, Sider, Content } = Layout

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [topGames, setTopGames] = useState([])

  const signinOnSuccess = () => {
    setLoggedIn(true)
  }

  const signoutOnClick = () => {
    logout().then(() => {
      setLoggedIn(false)
      message.success('Successfully Signed out')
    }).catch((err) => {
      message.error(err.message)
    })
  }

  useEffect(() => {
    getTopGames().then((data) => {
      setTopGames(data)
    }).catch((err) => {
      message.error(err.message)
    })
  }, [getTopGames])

  return (
    <Layout>
      <PageHeader
        loggedIn={loggedIn}
        signoutOnClick={signoutOnClick}
        signinOnSuccess={signinOnSuccess}
      />
      <Layout>
        <Sider width={300} className="site-layout-background">
          <CustomSearch />
          <Menu
            mode="inline"
            onSelect={() => { }}
            style={{ marginTop: '10px' }}
          >
            <Menu.Item icon={<LikeOutlined />} key="Recommendation">
              Recommend for you!
            </Menu.Item>
            <SubMenu icon={<FireOutlined />} key="Popular Games" title="Popular Games" className="site-top-game-list" >
              <TopGames topGames={topGames} />
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: '24px' }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              height: 800,
              overflow: 'auto'
            }}
          >
            {'Home'}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default App;
