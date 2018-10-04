call build.bat
del ..\Propsols_deployment\propsols\main.*
xcopy dist\propsols-app ..\Propsols_deployment\propsols /E/Y
cd ..\Propsols_deployment\propsols
git add -A
git commit -am "New version pushed"
git push https://sai-alladi:aax222333@propsols.scm.azurewebsites.net:443/propsols.git --all
cd ..\..\propsols