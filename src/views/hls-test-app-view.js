import React from 'react';
import {MasterM3u8UrlView} from './master-m3u8-url-view';
import {RenditionListView} from './rendition-list-view';
import {PlayerView} from './player-view';

export const HlsTestAppView = React.createClass({
  render: () => (
    <div>
      <MasterM3u8UrlView/>
      <RenditionListView/>
      <PlayerView/>
    </div>
  ),

});

