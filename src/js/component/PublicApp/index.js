import React from 'react'
// import { Status404, } from 'js/page'
import {
  Tech, Services, About, Home, Contact,
} from 'js/component'
import { Sidebar, } from 'js/layout'
import { Switch, Route, } from 'react-router-dom'

const TechPage = () => <Sidebar title="Technology" component={Tech} />
const ServicesPage = () => <Sidebar title="Services" component={Services} />
const AboutPage = () => <Sidebar title="About" component={About} />
const HomePage = () => <Sidebar title="Home" component={Home} />
const ContactPage = () => <Sidebar title="Contact" component={Contact} />

export const PublicApp = () => (
  <Switch>
    <Route path="/contact/" component={ContactPage} />
    <Route path="/technology/" component={TechPage} />
    <Route path="/services/" component={ServicesPage} />
    <Route path="/about/" component={AboutPage} />
    <Route path="/" component={HomePage} />
    {/* <Route component={Status404} /> */}
  </Switch>
)
