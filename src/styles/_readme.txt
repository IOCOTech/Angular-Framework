Folder Structure of Styles
1.Custom
    Place all component and custom created files here.
    Name with an _name.scss (e.g. _buttons.scss )
    Import into the styles.scss file usder the custom heading

    Not sure where to put your class?
        e.g. Styling an icon in a button and not sure where to put the class?
        Ask these questions 
        1. Is this something that can reused on other components (e.g. .icon-grey)
            Yes - Place it in a more general file , avalable for reuse and give a generic name ( .text-grey{})
            No - Next Question
        2. Will this apply to other icons outside of Button?
            Yes - put it in the icons.scss
            No - put it in the buttons.scss


2.General
    These are general pre-setup files for use. You can edit these files.
    These files contain general styling classes to help make styling quicker
3.Themes
    These are your project Theme files.
    You will only have 1 for now. This is your your projects main theme and dark theme.
    You can set up more themese if needed

Naming Convention Standards
    Kebab case is used for naming classes (e.g. .text-colour-primary)
    Be descriptive in naming so other devs know what the class is
    Please see notes in variables.scss for variable naming.

NPM Packages 
    Angular material 
    Flex Layout



1 Setup for project.
- copy style files
- create material module for imports
- import to app.modules.ts
- set up dark mode (if needed)
2 Update your theme colours in theme and in variables
3 update other variables (font, spacing etc. if needed)





Here is code to implement the toggle switch for changing light and dark theme 


 constructor(private overlay: OverlayContainer) {}

  toggleControl = new FormControl(false);
  @HostBinding('class') className = '';

  ngOnInit() {
    this.toggleControl.valueChanges.subscribe((darkMode) => {
      const darkClassName = 'dark-theme';
      this.className = darkMode ? darkClassName : '';
      if (darkMode) {
        this.overlay.getContainerElement().classList.add(darkClassName);
      } else {
        this.overlay.getContainerElement().classList.remove(darkClassName);
      }
    });