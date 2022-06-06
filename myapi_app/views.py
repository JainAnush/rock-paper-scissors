from django.shortcuts import render
from django.views import View
from django.http import HttpResponse
import json,random

class MyView2(View):
    def get(self,request):
        return render(request,'game.html')
class MyView(View):
    def get(self,request):
        return render(request,'homepage.html')

class MyRPSResult(View):
    def get(self,request):
        print("in MYRPSResult View")
        userinput=int(request.GET['userinput'])
        userscore=int(request.GET['userscore'])
        computerscore=int(request.GET['computerscore'])
        print(userinput,userscore,computerscore)
        computer_choice=random.randint(1,3)
        msg=''
        res=0
        if userinput==computer_choice:
            msg='ITS A DRAW IN THIS TURN'
        elif userinput==1:
            if computer_choice==2:
                res=2
            else:
                res=1
        elif userinput==2:
            if computer_choice==3:
               res=3
            else:
                res=2
        else:
            if computer_choice==1:
                res=1
            else:
                res=3
        if res==userinput:
            userscore+=1
            msg='GOOD! YOU WIN IN THIS TURN'
        elif res==computer_choice:
            computerscore+=1
            msg='COMPUTER WIN IN THIS TURN'                                     
        result_dict={'userscore':userscore,'computerscore':computerscore,'computerchoice':computer_choice,'msg':msg}
        return HttpResponse(json.dumps(result_dict,indent=3))


