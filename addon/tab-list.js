//(c) 2014 Indexia, Inc.
import Em from 'ember';
import WithConfigMixin from 'ember-idx-utils/mixin/with-config';
var computed = Em.computed;

/**
 * `{{em-tab-list}}` component.
 *
 * Holds a list of `{{em-tab}}` components.
 * *Must be a direct descendent of the `{{em-tabs}` component.*

 * @class TabList
 */

export default Em.Component.extend(WithConfigMixin, {
  setTagName: (function() {
    return this.set('tagName', this.get('config.tabs.tabListTag') || 'div');
  }).on('init'),
  classNameBindings: ['styleClasses'],
  styleClasses: (function() {
    var _ref;
    return (_ref = this.get('config.tabs.tabListClasses')) != null ? _ref.join(" ") : void 0;
  }).property(),

  /**
   * The ancestor `Tabs` component
   * @property tabs
   * @type Tabs
   */
  tabs: computed.alias('parentView'),

  /**
   * The tab instances of this list.
   *
   * @property tab_instances
   * @type ArrayProxy
   */
  tab_instances: void 0,

  /**
   * The current selected tab
   *
   * @property selected
   * @type Tab
   */
  selected: computed.alias('parentView.selectedTab'),

  /**
   * The selected tab index
   *
   * @property selectedIdx
   * @type Number
   */
  selectedIdx: (function() {
    return this.get('tab_instances').indexOf(this.get('selected'));
  }).property('selected'),

  /**
   * Auto register this `TabList` in the ancestor tabs component.
   *
   * @method register
   * @private
   */
  register: (function() {
    return this.get('tabs').setTabList(this);
  }).on('didInsertElement'),

  /**
   * Initialize an empty tabs array
   *
   * @method initTabs
   * @private
   */
  initTabs: (function() {
    return this.set('tab_instances', Em.ArrayProxy.create({
      content: []
    }));
  }).on('init'),

  /**
   * Add a tab to the tab list
   *
   * @method addTab
   * @param tab {Tab} the tab to add.
   * @private
   */
  addTab: function(tab) {
    return this.get('tab_instances').addObject(tab);
  },

  /**
   * Remove a tab from the tab list
   *
   * @method removeTab
   * @param tab {Tab} the tab to remove.
   * @private
   */
  removeTab: function(tab) {
    var nextIdx, tabIdx, _ref;
    this.get('tab_instances').removeObject(tab);
    if (this.get('tabs.selected') === tab) {
      tabIdx = tab.get('index');
      nextIdx = (_ref = tabIdx === 0) != null ? _ref : {
        tabIdx: tabIdx - 1
      };
      return this.get('tabs').select(this.get('tab_instances').objectAt(nextIdx));
    }
  }
});