import * as HeadlessUI from '@headlessui/vue'
import { ErrorMessage, Field, Form } from 'vee-validate'
import { Plugin } from 'vue'
import DwBtn from '../buttons/dw-btn.vue'
import DwCollapse from '../content/dw-collapse.vue'
import DwModal from '../content/dw-modal.vue'
import DwPageHeader from '../content/dw-page-header.vue'
import DwAlert from '../elements/dw-alert.vue'
import DwBadge from '../elements/dw-badge.vue'
import DwDataCard from '../elements/dw-data-card.vue'
import DwLabel from '../elements/dw-label.vue'
import DwCheckbox from '../form/dw-checkbox.vue'
import DwCombobox from '../form/dw-combobox.vue'
import DwInput from '../form/dw-input.vue'
import DwSelect from '../form/dw-select.vue'
import DwTextarea from '../form/dw-textarea.vue'
import DwFileIcon from '../icons/dw-file-icon.vue'
import DwLoadingIndicator from '../icons/dw-loading-indicator.vue'
import DwLogoIcon from '../icons/dw-logo-icon.vue'
import DwMatIcon from '../icons/dw-mat-icon.vue'
import DwTaskAddIcon from '../icons/dw-task-add-icon.vue'
import DwTrashIcon from '../icons/dw-trash-icon.vue'
import DwContainer from '../layout/dw-container.vue'
import DwLinkOrSpan from '../links/dw-link-or-span.vue'
import DwLink from '../links/dw-link.vue'
import DwTertiaryNavigationItem from '../links/dw-tertiary-navigation-item.vue'
import DwBreadcrumbs from '../navigation/dw-breadcrumbs.vue'
import DwDataTable from '../tables/data-table/dw-data-table.vue'
import DwSimpleTable from '../tables/dw-simple-table.vue'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    // vee-validate
    VvForm: typeof Form
    VvField: typeof Field
    VvErrorMessage: typeof ErrorMessage

    // headless-ui
    HMenu: typeof HeadlessUI.Menu
    HMenuItem: typeof HeadlessUI.MenuItem
    HMenuItems: typeof HeadlessUI.MenuItems
    HMenuButton: typeof HeadlessUI.MenuButton
    HListbox: typeof HeadlessUI.Listbox
    HListboxLabel: typeof HeadlessUI.ListboxLabel
    HListboxButton: typeof HeadlessUI.ListboxButton
    HListboxOption: typeof HeadlessUI.ListboxOption
    HListboxOptions: typeof HeadlessUI.ListboxOptions
    HCombobox: typeof HeadlessUI.Combobox
    HComboboxInput: typeof HeadlessUI.ComboboxInput
    HComboboxLabel: typeof HeadlessUI.ComboboxLabel
    HComboboxButton: typeof HeadlessUI.ComboboxButton
    HComboboxOption: typeof HeadlessUI.ComboboxOption
    HComboboxOptions: typeof HeadlessUI.ComboboxOptions
    HSwitch: typeof HeadlessUI.Switch
    HSwitchLabel: typeof HeadlessUI.SwitchLabel
    HSwitchGroup: typeof HeadlessUI.SwitchGroup
    HSwitchDescription: typeof HeadlessUI.SwitchDescription
    HDisclosure: typeof HeadlessUI.Disclosure
    HDisclosurePanel: typeof HeadlessUI.DisclosurePanel
    HDisclosureButton: typeof HeadlessUI.DisclosureButton
    HDialog: typeof HeadlessUI.Dialog
    HDialogTitle: typeof HeadlessUI.DialogTitle
    HDialogPanel: typeof HeadlessUI.DialogPanel
    HDialogOverlay: typeof HeadlessUI.DialogOverlay
    HDialogBackdrop: typeof HeadlessUI.DialogBackdrop
    HDialogDescription: typeof HeadlessUI.DialogDescription
    HRadioGroup: typeof HeadlessUI.RadioGroup
    HRadioGroupLabel: typeof HeadlessUI.RadioGroupLabel
    HRadioGroupOption: typeof HeadlessUI.RadioGroupOption
    HRadioGroupDescription: typeof HeadlessUI.RadioGroupDescription
    HPopover: typeof HeadlessUI.Popover
    HPopoverPanel: typeof HeadlessUI.PopoverPanel
    HPopoverGroup: typeof HeadlessUI.PopoverGroup
    HPopoverButton: typeof HeadlessUI.PopoverButton
    HPopoverOverlay: typeof HeadlessUI.PopoverOverlay
    HTabs: typeof HeadlessUI.Tab
    HTabsList: typeof HeadlessUI.TabList
    HTabsPanel: typeof HeadlessUI.TabPanel
    HTabsGroup: typeof HeadlessUI.TabGroup
    HTabsPanels: typeof HeadlessUI.TabPanels
    HTransitionRoot: typeof HeadlessUI.TransitionRoot
    HTransitionChild: typeof HeadlessUI.TransitionChild
    HFocusTrap: typeof HeadlessUI.FocusTrap
    HPortal: typeof HeadlessUI.Portal
    HPortalGroup: typeof HeadlessUI.PortalGroup

    DwMatIcon: typeof DwMatIcon
    DwLogoIcon: typeof DwLogoIcon
    DwLoadingIndicator: typeof DwLoadingIndicator
    DwTaskAddIcon: typeof DwTaskAddIcon
    DwTrashIcon: typeof DwTrashIcon
    DwBtn: typeof DwBtn
    DwAlert: typeof DwAlert
    DwBadge: typeof DwBadge
    DwLabel: typeof DwLabel
    DwInput: typeof DwInput
    DwTextarea: typeof DwTextarea
    DwCheckbox: typeof DwCheckbox
    DwSelect: typeof DwSelect
    DwCombobox: typeof DwCombobox
    DwContainer: typeof DwContainer
    DwPageHeader: typeof DwPageHeader
    DwLink: typeof DwLink
    DwLinkOrSpan: typeof DwLinkOrSpan
    DwTertiaryNavigationItem: typeof DwTertiaryNavigationItem
    DwDataTable: typeof DwDataTable
    DwSimpleTable: typeof DwSimpleTable
    DwBreadcrumbs: typeof DwBreadcrumbs
    DwModal: typeof DwModal
    DwDataCard: typeof DwDataCard
    DwFileIcon: typeof DwFileIcon
    DwCollapse: typeof DwCollapse
  }
}

let installed = false

export const uiComponents: Plugin = {
  install(app) {
    if (!installed) {
      // vee-validate
      app.component('vv-form', Form)
      app.component('vv-field', Field)
      app.component('vv-error-message', ErrorMessage)

      // headless-ui
      app.component('h-menu', HeadlessUI.Menu)
      app.component('h-menu-item', HeadlessUI.MenuItem)
      app.component('h-menu-items', HeadlessUI.MenuItems)
      app.component('h-menu-button', HeadlessUI.MenuButton)
      app.component('h-listbox', HeadlessUI.Listbox)
      app.component('h-listbox-label', HeadlessUI.ListboxLabel)
      app.component('h-listbox-button', HeadlessUI.ListboxButton)
      app.component('h-listbox-option', HeadlessUI.ListboxOption)
      app.component('h-listbox-options', HeadlessUI.ListboxOptions)
      app.component('h-combobox', HeadlessUI.Combobox)
      app.component('h-combobox-input', HeadlessUI.ComboboxInput)
      app.component('h-combobox-label', HeadlessUI.ComboboxLabel)
      app.component('h-combobox-button', HeadlessUI.ComboboxButton)
      app.component('h-combobox-option', HeadlessUI.ComboboxOption)
      app.component('h-combobox-options', HeadlessUI.ComboboxOptions)
      app.component('h-switch', HeadlessUI.Switch)
      app.component('h-switch-label', HeadlessUI.SwitchLabel)
      app.component('h-switch-group', HeadlessUI.SwitchGroup)
      app.component('h-switch-description', HeadlessUI.SwitchDescription)
      app.component('h-disclosure', HeadlessUI.Disclosure)
      app.component('h-disclosure-panel', HeadlessUI.DisclosurePanel)
      app.component('h-disclosure-button', HeadlessUI.DisclosureButton)
      app.component('h-dialog', HeadlessUI.Dialog)
      app.component('h-dialog-panel', HeadlessUI.DialogPanel)
      app.component('h-dialog-title', HeadlessUI.DialogTitle)
      app.component('h-dialog-overlay', HeadlessUI.DialogOverlay)
      app.component('h-dialog-backdrop', HeadlessUI.DialogBackdrop)
      app.component('h-dialog-description', HeadlessUI.DialogDescription)
      app.component('h-radio-group', HeadlessUI.RadioGroup)
      app.component('h-radio-group-label', HeadlessUI.RadioGroupLabel)
      app.component('h-radio-group-option', HeadlessUI.RadioGroupOption)
      app.component('h-radio-group-description', HeadlessUI.RadioGroupDescription)
      app.component('h-popover', HeadlessUI.Popover)
      app.component('h-popover-panel', HeadlessUI.PopoverPanel)
      app.component('h-popover-group', HeadlessUI.PopoverGroup)
      app.component('h-popover-button', HeadlessUI.PopoverButton)
      app.component('h-popover-overlay', HeadlessUI.PopoverOverlay)
      app.component('h-tabs', HeadlessUI.Tab)
      app.component('h-tabs-list', HeadlessUI.TabList)
      app.component('h-tabs-group', HeadlessUI.TabGroup)
      app.component('h-tabs-panel', HeadlessUI.TabPanel)
      app.component('h-tabs-panels', HeadlessUI.TabPanels)
      app.component('h-transition-root', HeadlessUI.TransitionRoot)
      app.component('h-transition-child', HeadlessUI.TransitionChild)
      app.component('h-focus-trap', HeadlessUI.FocusTrap)
      app.component('h-portal', HeadlessUI.Portal)
      app.component('h-portal-group', HeadlessUI.PortalGroup)

      app.component('dw-mat-icon', DwMatIcon)
      app.component('dw-logo-icon', DwLogoIcon)
      app.component('dw-task-add-icon', DwTaskAddIcon)
      app.component('dw-trash-icon', DwTrashIcon)
      app.component('dw-loading-indicator', DwLoadingIndicator)
      app.component('dw-file-icon', DwFileIcon)

      app.component('dw-btn', DwBtn)
      app.component('dw-alert', DwAlert)
      app.component('dw-badge', DwBadge)
      app.component('dw-label', DwLabel)
      app.component('dw-input', DwInput)
      app.component('dw-textarea', DwTextarea)
      app.component('dw-checkbox', DwCheckbox)
      app.component('dw-select', DwSelect)
      app.component('dw-combobox', DwCombobox)
      app.component('dw-modal', DwModal)
      app.component('dw-container', DwContainer)
      app.component('dw-page-header', DwPageHeader)

      app.component('dw-link', DwLink)
      app.component('dw-link-or-span', DwLinkOrSpan)
      app.component('dw-tertiary-navigation-item', DwTertiaryNavigationItem)

      app.component('dw-data-table', DwDataTable)
      app.component('dw-simple-table', DwSimpleTable)

      app.component('dw-breadcrumbs', DwBreadcrumbs)

      app.component('dw-data-card', DwDataCard)
      app.component('dw-collapse', DwCollapse)

      installed = true
    }
  }
}
