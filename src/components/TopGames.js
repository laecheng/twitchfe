import React from 'react'
import { Menu } from 'antd'

function TopGames({ topGames }) {
  return topGames.map((game) => (
    <Menu.Item key={game.id} style={{ height: '50px' }}>
      <img
        alt="Placeholder"
        src={game.box_art_url.replace('{height}', '40').replace('{width}', '40')}
        style={{ borderRadius: '50%', marginRight: '20px' }}
      />
      <span>
        {game.name}
      </span>
    </Menu.Item>
  )
  )
}

export default TopGames