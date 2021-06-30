# component-creator-reactjs
component-creator-reactjs is a cli, so that you can build your projects faster.

# Install
```console
npm install -g component-creator-reactjs
```

# Creating components 
```console
rcc create
```
It should prompt you some questions. After answering them, it will create a components folder in the directory you initiated this command.<br>
And so **make sure you run the command in the folder you want your components to be in**. It will also warn you if there are already components of the same name present in the folder.<br>
Additionally, it also creates the required boiler-plate code in each component file.
```console
? Enter components to be created (space-seperated): header footer navbar
? Select extension for your component file: .jsx
? Select extension for your stylesheet: .css
? WARN! Files will be overwritten! Are you sure Yes
✔️ Components created successfully!
```


# Removing components
### Remove some specific components
```console
rcc remove
```
This can be used to remove some specific components from the components folder.
This command will also prompt you to answer some questions and if the components specified by you exists, then they will be deleted.
```console
? Enter components to be removed (space-seperated): header footer title navbar events title
? WARN! Are you sure: Yes
✔️ Components removed successfully!
```

### Remove all components
```console
rcc remove all
```
***or***
```console
rcc remove -a
```
This will remove all the components from you cwd, and also delete the components folder.
```console
? WARN! Are you sure: Yes
✔️ All Components Removed!
```

# Report Bugs
Since this is in early development stage, there might be bugs.
```console
rcc report
```

This will prompt you an option for registering a bug.
