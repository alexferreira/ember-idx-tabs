import Em from 'ember';
import Config from 'ember-idx-utils/config'

export default {
  name: 'ember-idx-tabs',
  initialize: function() {
    if (!Em.Config) {
        Em.Config = Config.create()
    }

    var defaultConfig = Em.Config.getConfig('default');
    if (!defaultConfig) {
        Em.Config.addConfig('default');
        defaultConfig = Em.Config.getConfig('default');
    }

    defaultConfig['tabs'] = {
        tabsTag: ['div'],
        tabTag: ['li'],
        tabListTag: ['ul'],
        tabsClasses: ['em-tabs'],
        tabClasses: ['em-tab'],
        tabListClasses: ['em-tab-list'],
        tabPanelClasses: ['em-tab-panel']
    }

    //Bootstrap
    var bsConfig = Em.Config.getConfig('bs');
    if (!bsConfig) {
        Em.Config.addConfig('bs');
        bsConfig = Em.Config.getConfig('bs');
    }
    bsConfig['tabs'] = {
        tabTag: ['li'],
        tabListTag: ['ul'],
        tabListClasses: ['nav', 'nav-tabs'],
        tabPanelClasses: ['em-tab-panel'],
        tabSelectedClasses: ['active']        
    }
  }
};
