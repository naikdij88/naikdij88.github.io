////////////////////////////////////////////////
// Original written by Kelly Linden           //
// Modified by Kuraiko Yoshikawa (2009/07/28) //
////////////////////////////////////////////////
 
// Set this to whatever text you want above your status
string header = "My Status:\n";
// This is the url to the post.cgi from above
string updater_url = "<url to your python script>";
 
// The magic changed flags to know when to re-request an url
// CHANGED_REGION | CHANGED_REGION_START | CHANGED_TELEPORT
integer CHANGED_URL = 1792;
 
key request;
// Setup run anytime we think our url has been lost.
setup()
{
    llSetObjectName("HTTP Server: Status Updates");
    llRequestURL();
}
 
// Debug incoming requests to see all header information.
debug(key id, string method, string body)
{
    llOwnerSay(method + ": " + body);
    list headers = ["x-script-url","x-path-info","x-query-string","x-remote-ip","user-agent"];
    integer i;
    for (i=0;i<5;++i)
    {
        llOwnerSay(llList2String(headers,i) + ": " + llGetHTTPHeader(id,llList2String(headers,i)));
    }
}
 
default
{
    // These events mean we have lost any urls we had and need to run setup()
    state_entry() 
    { 
        setup(); 
    }
    on_rez(integer n) 
    { 
        setup(); 
    }
    changed(integer c) 
    { 
        if (c & (CHANGED_URL) ) setup(); 
    }
 
    http_request(key id, string method, string body)
    {
         //debug(id, method, body);
 
        if (method == URL_REQUEST_GRANTED)
        {
            // Register our url for new status updates.
            request = llHTTPRequest(updater_url + "?URL=" + body + "/",[],"");
        }
        else if (method == URL_REQUEST_DENIED)
        {
            // Might be good to have this email.
            llSay(0,"Something went wrong, no url. " + body);
        }
        else if (method == "GET")
        {
            // Process a status update by parsing the query string
            string t = llGetHTTPHeader(id,"x-query-string");
            list l = llParseString2List(t,["?","=","&"],[]);
 
            // We want the value after Message
            integer i = llListFindList(l,["Message"]) + 1;
 
            // If there was no Message argument then i = (-1) + 1 => 0.
            // As long as i > 0 we found Message so put up whatever came next as the status.
            if (i > 0)
            {
                llSetText(header + llUnescapeURL(llList2String(l,i)),<1,1,0>,1);
                llHTTPResponse(id,200,"OK");
            }
            else
            {
                llHTTPResponse(id,400,"Must Specify a message!");
            }
        }
        else
        {
            llHTTPResponse(id,405,"Method unsupported");
        }
    }
 
    http_response(key request_id, integer status, list meta, string body)
    {
        if(request_id == request)
        {
            list t = llParseString2List(body, ["|"], [""]);
            string t0 = llStringTrim(llList2String(t, 0), STRING_TRIM);
            string t1 = llStringTrim(llList2String(t, 1), STRING_TRIM);
            if(t0 == "OK")
            {
                llSay(0, "URL successfully updated.");
            }
            else if (t0 == "ERROR")
            {
                llSay(0, "Can't write the URL to the file '" + t1 + 
                "'. Please check if the file exists and the script has write permissions.");
            }
            else
            {
                llSay(0, "Something went wrong.\n" + body);
            }
        }
    }
}