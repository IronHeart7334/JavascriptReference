import sys
import os

def run():
    os.chdir("projects")
    for arg in getNonPyArgs():
        print(arg)
        attemptNewProject(arg)
    os.chdir("..") 

def getNonPyArgs():
    return (arg for arg in sys.argv if not arg.endswith(".py"))

def attemptNewProject(name):
    try:
        createFolder(name)
        appendToProjectList(name)
    except BaseException as e:
        print(e)

def createFolder(name):
    #todo: read template HTML
    os.mkdir(name)
    os.chdir(name)
    os.mkdir("css")
    os.mkdir("script")
    file = open("index.html", "x")
    file.close()
    os.chdir("..")

def appendToProjectList(name):
    with open("projects.txt", "a") as projectListFile:
        projectListFile.write(f'{name}\n')

if __name__ == "__main__":
    run()
