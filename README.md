# IOCO Angular Framework

## Docker Dev Container

This project is configured to run in a Dev Container. No need to install any packages, just open project in remote container using VS Code.
The container will be created, packages installed and extensions loaded in VS Code.

To run project, open a terminal and run:

```
npm start
```

Follow the instruction below if you choose not use the Docker Dev Container.

## To Run

- Clone Repo
- npm install
- npm start

## Dev Standards

- All component properties / methods are **private if not bound to HTML**
- All Private Methods at the bottom
- Public Methods do not have public prefix.

```diff
- public addUser(user){ ... }
+ addUser(user){ ... }
```

- Unused Services have been removed from Component Constructor
- No Services are public
- All Service subscriptions are unsubscribed onDestroy
- Using full names for variables and not, `a = x` or `usr = result.user`
- Link work item for tracking if possible
  - Tip - add #{TaskNumber} to commit message to link for item ie: `Resolves #123 Added blah blah` or `#123 #321 #111`
- Order of code
  - Private Properties
  - Constructor
  - Inputs / Outputs
  - Public Properties
  - LifeCycle hooks
  - Public Methods
  - Private Methods

### example:

```TS
export class Demo implements OnInit,OnDestroy {
  private subscriptions = new Subscription();
  private userId: string;

  constructor(private someService: SomeService) { ... }

  @Input() test: string;
  @Output() select = ...;

  availableList = [ ... ];

  ngOnInit(): void {
    this.subscriptions.add(this.someService.doServiceCall().subscribe());
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  userSelected() {
    ...
  }

  private doSomething(){ ... }
}
```
