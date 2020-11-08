import React, { useEffect, useState } from 'react'
import styled from "styled-components"

import { 
  Heading, 
  Icon,
  Flex, 
  FlexItem,
  MenuList,
  MenuGroup,
  MenuItem,
  theme
} from '@looker/components'
/* NOTE: import palette is not recommended. What is the recommended approach to custom palettes? */
import { palette } from '@looker/design-tokens'

import SidebarToggle from './SidebarToggle'


const params = {
  title: 'Title from Homepage.js',
  headerColor: palette.blue200,
  headerBackground: palette.blue500, 
  sidebar: [
    {
      key: 1,
      title: 'First Section',
      items: [
        {
          key: 2,
          title: 'Page A',
          icon: 'Account',
          url: '/page/A'
        },
        {
          key: 3,
          title: 'Page B (current)',
          icon: 'ApplicationSelect',
          url: '/page/B'
        },
      ]
    },
    {
      key: 4,
      title: 'Second Section',
      items: [
        {
          key: 5,
          title: 'Page C',
          icon: 'Calendar',
          url: '/page/C'
        },
        {
          key: 6,
          title: 'Page D',
          icon: 'ChartColumn',
          url: '/page/D'
        },
      ]
    },
  ]
}

const Homepage = () => {
  const [heading, setHeading] = useState(params.title)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  useEffect(() => {
    fetch('/api/test')
      .then(res => res.text())
      .then(heading => setHeading(heading))
  })

  return (
    <>
      <PageHeader
          color={params.headerColor} 
          backgroundColor={params.headerBackground}
      >
        <FlexItem mr="medium" pt="xsmall">
          <Icon name="LogoRings" color="inverseOn" size={24} />
        </FlexItem>
        <FlexItem>
          <Heading as="h1" fontWeight='bold'>{heading}</Heading>
        </FlexItem>
      </PageHeader>

      <PageLayout open={sidebarOpen}>
        <LayoutSidebar>
          {sidebarOpen &&
            <MenuList>
              {params.sidebar.map(group => (
                <MenuGroup key={group.key} label={group.title}>
                  {group.items.map(item => (
                    <MenuItem key={item.key} icon={item.icon} current={item.key==3 ? true : false}>{item.title}</MenuItem>
                  ))}
                </MenuGroup>
              ))}
            </MenuList>
          }
        </LayoutSidebar>

        <SidebarDivider open={sidebarOpen}>
          <SidebarToggle
            isOpen={sidebarOpen}
            onClick={toggleSidebar}
            headerHeigh="114px"
          />
        </SidebarDivider>

      </PageLayout>
    </>
  )
}


const PageHeader = styled(Flex)`
  background-color: ${props => props.backgroundColor};
  background-position: 100% 0;
  background-repeat: no-repeat;
  background-size: 836px 120px;
  padding: ${theme.space.large};
  h1 {
    color: ${props => props.color};
  }
`

const PageLayout = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: ${props =>
    props.open ? "16.625rem 0 1fr" : "1.5rem 0 1fr"};
  grid-template-areas: "sidebar divider main";
  position: relative;
`

const PageContent = styled.div`
  grid-area: main;
  position: relative;
`

const LayoutSidebar = styled.aside`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 16.625rem;
  grid-area: sidebar;
  z-index: 0;
`

const SidebarDivider = styled.div`
  transition: border 0.3s;
  border-left: 1px solid
    ${props =>
      props.open ? 'grey' : "transparent"};
  grid-area: divider;
  overflow: visible;
  position: relative;
  &:hover {
    border-left: 1px solid
      ${props =>
        props.open
          ? 'lightgrey'
          : 'darkgrey'};
  }
`

export default Homepage