Flask Installation Guide:
(Mac or linux users skip step 1)
1. Make sure both python3 and pip3 have aliases or their PATH variable is set. Because I use git bash on my windows machine (Because PowerShell and Commandline suck), I could do this by making a .bashrc file in /Users/Riley (or ~) and then editing that file to include the following to lines
```
alias python3='{$PYTHON3_INSTALLATION_LOCATION}/python3.exe'
alias pip3='{$PYTHON3_INSTALLATION_LOCATION}/Scripts/pip3.exe'
```
(NOTE: Your Python3 installation locations will likely be different than mine)

2. Open your favorite command line tool, I again use git bash, and type
```
pip3 install Flask
```

3. You're done. Thats not too hard, but it will probably require libraries later so more installation fun