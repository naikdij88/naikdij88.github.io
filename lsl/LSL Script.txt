//Lacrimosa - Am ende der stille
//Lacrimosa - Alleine zu Zweit

//LSL Meeting chat logger by Adelle Fitzgerald. In-world script posts chat to a PHP webserver. The PHP writes to a text document and an Ajax reader will display the chat log in realtime on a web browser.

//Licenced under Creative Commons Attribution-Share Alike 3.0 Unported - http://creativecommons.org/licenses/by-sa/3.0/


//You are free:

//    * to Share — to copy, distribute and transmit the work
//    * to Remix — to adapt the work

//Under the following conditions:

//    * Attribution — You must attribute the work in the manner specified by the author or licensor (but not in any way that suggests that they endorse you or your use of the work).

//    * Share Alike — If you alter, transform, or build upon this work, you may distribute the resulting work only under the same, similar or a compatible license.

//With the understanding that:

//    * Waiver — Any of the above conditions can be waived if you get permission from the copyright holder.
//    * Public Domain — Where the work or any of its elements is in the public domain under applicable law, that status is in no way affected by the license.
//    * Other Rights — In no way are any of the following rights affected by the license:
//          o Your fair dealing or fair use rights, or other applicable copyright exceptions and limitations;
//          o The author's moral rights;
//          o Rights other persons may have either in the work itself or in how the work is used, such as publicity or privacy rights.
//    * Notice — For any reuse or distribution, you must make clear to others the license terms of this work. The best way to do this is with a link to this web page.

//Disclaimer

//The Commons Deed is not a license. It is simply a handy reference for understanding the Legal Code (the full license) — it is a human-readable expression of some of its key terms. Think of it as the user-friendly interface to the Legal Code beneath. This Deed itself has no legal value, and its contents do not appear in the actual license.

//Creative Commons is not a law firm and does not provide legal services. Distributing of, displaying of, or linking to this Commons Deed does not create an attorney-client relationship.

//For instructions please visit http://www.osgrid.org/forums/viewtopic.php?f=5&t=2745
//Please note this script will not work on it's own and requires a PHP webserver + PHP script to function.


string loggerurl = "http://www.dreamtechnologies.co.uk/meetinglog/meetinglogger.php"; //This is the URL to the php script on your webserver
string logurl = "http://www.dreamtechnologies.co.uk/meetinglog/meetinglog.html"; //This is the URL to the chat log page for people to view online
integer gChannel = 0; //The channel for it to listen to chat on. Normally we will want this on channel 0 for its intended purpose
string fKey = "1234"; //This key needs to correspond with the key in chatlogger.php. This should stop (most) people from maliciously posting to the logger (providing they don't know it!).

key req_id2;
string time;
list lsTime;
integer isLogging = FALSE;
integer handle;
integer menuHandle;
integer menuChannel;
key gUser;
string loggingStatus;

postMessage(string msg)
{
    req_id2 = llHTTPRequest( loggerurl, [HTTP_METHOD,"POST",HTTP_MIMETYPE,"application/x-www-form-urlencoded"], msg);
}


doMenu()
{
    llListenControl(menuHandle, TRUE);
    llSetTimerEvent(30);
    llDialog(gUser, "\n\nPlease Choose:", ["On", "Off", "Cancel", "Clear Log"], menuChannel);
}

doMenuSure()
{
    llSetTimerEvent(30);
    llDialog(gUser, "\n\nAre you sure? Clearing the log will wipe it from the website", ["Yes", "No"], menuChannel);
}

loggingOn()
{
    llListenControl(menuHandle, FALSE);
    llSetTimerEvent(0);
    llSay(0,"Meeting chat logging has been enabled. You can view the log at: " + logurl);
    isLogging = TRUE;
    llListenControl(handle, isLogging);
    llSetColor(<1,0,0>, ALL_SIDES);
    llSetText("Meeting chat Logging On\n" + logurl,<1,1,1>,1);
    llSetObjectDesc("Logging On");
}

loggingOff()
{
    llListenControl(menuHandle, FALSE);
    llSetTimerEvent(0);
    isLogging = FALSE;
    llListenControl(handle, isLogging);
    llSetColor(<0,1,0>, ALL_SIDES);
    llSetText("Meeting chat Logging Off",<1,1,1>,1);
    llSay(0,"Meeting chat logging has been disabled. You can view the full log at: " + logurl);
    llSetObjectDesc("Logging Off");
}


default
{
    state_entry()
    {
        menuChannel = (integer)llFrand(2147423647) + 10000;
        handle = llListen(gChannel, "", "", "");
        menuHandle = llListen(menuChannel, "", "", "");
        llListenControl(handle, FALSE);
        llListenControl(menuHandle, FALSE);
        llSetText("Meeting chat Logging Off",<1,1,1>,1);
        llSetColor(<0,1,0>, ALL_SIDES);
        loggingStatus = llGetObjectDesc();
        if (loggingStatus == "Logging On")
        {
            loggingOn();
        }
    }
   
    touch_start(integer num)
    {
        gUser = llDetectedKey(0);
        if (gUser == llGetOwner())
        {
            doMenu();
        }
    }
   
    listen(integer channel,string name,key id,string message)
    {
        if (channel == gChannel)
        {
            //Get the current UTC time and prune it to just hh:mm
            time = llGetTimestamp();
            lsTime = [];
            lsTime = lsTime + llParseString2List(time,["T","."],[]);
            time = llList2String(lsTime,1);
            time = llDeleteSubString(time, 5, 7);
           
            //If emoting (/me) strip out the /me and change the message posted to reflect that of the viewer
            if (llGetSubString(message, 0, 3) == "/me ")
            {
                message = llDeleteSubString(message, 0, 3);
                postMessage("fkey=" + fKey + "&ftime=[" + time + " UTC] " + "&fname=" + name + "&fmessage=<i>" + message + "</i>");
            }
            else
            {
                //Otherwise post the message in as a normal chat
                postMessage("fkey=" + fKey + "&ftime=[" + time + " UTC] " + "&fname=" + name + ":" + "&fmessage=" + message);
            }
        }
        else if (channel == menuChannel)
        {
            if (message == "On") //Turn on logging
            {
                loggingOn();
                time = llGetTimestamp();
                lsTime = [];
                lsTime = lsTime + llParseString2List(time,["T","."],[]);
                time = llList2String(lsTime,1);
                time = llDeleteSubString(time, 5, 7);
                postMessage("fkey=" + fKey + "&ftime=[" + time + " UTC] " + "&fmessage=<b>*** Logging started. ***</b>");
            }
            else if (message == "Off") //Turn off logging
            {
                loggingOff();
                time = llGetTimestamp();
                lsTime = [];
                lsTime = lsTime + llParseString2List(time,["T","."],[]);
                time = llList2String(lsTime,1);
                time = llDeleteSubString(time, 5, 7);
                postMessage("fkey=" + fKey + "&ftime=[" + time + " UTC] " + "&fmessage=<b>*** Logging stopped. ***</b>");
            }
            else if (message == "Yes") //Clear the log
            {
                llListenControl(menuHandle, FALSE);
                llSetTimerEvent(0);
                postMessage("fkey=" + fKey + "&fcmd=clear");
            }
            else if (message == "Clear Log") //Do the 'Are you sure?' thing
            {
                doMenuSure();
            }
            else if (message == "Cancel") //Close menu listen handler
            {
                llListenControl(menuHandle, FALSE);
                llSetTimerEvent(0);
            }
            else if (message == "No") //Close menu listen handler
            {
                llListenControl(menuHandle, FALSE);
                llSetTimerEvent(0);
            }
        }
    }
    timer()
    {
        //Close menu listen handler
        llSetTimerEvent(0);
        llListenControl(menuHandle, FALSE);
    }
}