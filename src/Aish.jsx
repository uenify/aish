import React, { Component } from 'react';
import axios from 'axios';

import config from './config.json'

class Aish extends Component {
  constructor(){
    super();
    this.state = {
      user: config.user,
      repo: config.repo,
      platforms: config.platforms,
      date: 'N/A',
      releases: []
    };
  }
  componentWillMount(){
    document.title = this.state.repo;
    var self = this
    axios({
      method: 'GET',
      url: 'https://api.github.com/repos/' + this.state.user + '/' + this.state.repo + '/releases',
    }).then((r)=>{
      let a = r.data[0].assets
      let p = self.state.platforms
      let releases = []
      let date = Math.round((new Date()*1 - new Date(r.data[0].published_at)*1) / (1000 * 60 * 60 * 24))
      for(let i in a){
        let name = a[i].name
        let extension = name.split('.')[name.split('.').length - 1]
        for(let j in p){
          if (p[j] === 'win'){
            if (name.includes('win') || extension === 'exe') {
              let release = {
                platform: 'Windows',
                url: a[i].browser_download_url,
                size: (a[i].size / 1048576).toFixed(1)
              }
              releases.push(release)
            }
          }
          if (p[j] === 'mac'){
            if (name.includes('mac') && (extension === 'zip' || extension === 'dmg')) {
              let release = {
                platform: 'macOS',
                url: a[i].browser_download_url,
                size: (a[i].size / 1048576).toFixed(1)
              }
              releases.push(release)
            }
          }
          if (p[j] === 'debian'){
            if (extension === 'deb') {
              let release = {
                platform: 'Debian',
                url: a[i].browser_download_url,
                size: (a[i].size / 1048576).toFixed(1)
              }
              releases.push(release)
            }
          }
          if (p[j] === 'linux'){
            if (extension === 'rpm' || extension === 'AppImage') {
              let release = {
                platform: 'Linux',
                url: a[i].browser_download_url,
                size: (a[i].size / 1048576).toFixed(1)
              }
              releases.push(release)
            }
          }
        }
      }
      self.setState({
        releases: releases,
        date: date
      })
      console.log(releases)
    })
  }
  render() {
    return (
      <div className="Aish">
        <header className="header">
          <a href={"https://github.com/" + this.state.user + '/' + this.state.repo }><h1><span className="user">{this.state.user}/</span>{this.state.repo}</h1></a>
          <span className="date">{this.state.date > 0 ? (this.state.date > 1 ? this.state.date + ' days ago': '1 day ago') : 'Today'}</span>
        </header>
        <main>
          {this.state.releases.map((release, index)=>(
            <div key={index} className="release">
              <a href={release.url}>
                <span className="platform">{release.platform}</span>
                <span className="size">{release.size} MB</span>
              </a>
            </div>
          ))}
        </main>
        <a href="https://github.com/uenify/aish" className="powered">powered by <b>Aish</b></a>
      </div>
    );
  }
}

export default Aish;
