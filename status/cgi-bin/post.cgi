#!/usr/bin/python
 
##############################################
# Original written by Kelly Linden           #
# Modified by Kuraiko Yoshikawa (2009/07/28) #
##############################################
 
import cgi, urllib2, urllib
import cgitb
cgitb.enable()
 
 
# This file needs to be readable and writable from this cgi
file_name = "my_url"
 
form = cgi.FieldStorage()
 
# Set the URL of your form
url = "enter your form url"
 
 
# If we haven't a Message or URL let the user know it and redirect to the form
if "Message" not in form and "URL" not in form:
 
        print "Content-Type: text/html"
        print
        print "<html><head><meta http-equiv=\"refresh\" content=\"5; URL=%s\"></head>" %url
        print "<body style=\"text-align: center; margin-top: 20px;\">"
        print "Please fill in the message field.<br><a href=\"%s\">Redirection to the form in 5 seconds</a>" %url
        print "</body></html>"
 
# If we have URL param then this is an URL update
elif "URL" in form: 
        # Intercept errors
        try:
                # Write the url to the file, overwriting the existing file. 
                f = open(file_name,'w')
                f.write(form["URL"].value)
 
                # Let the caller know it worked.
                print "Content-Type: text/html"
                print
                print "OK"
        except:
                # it has an error.
                print "Content-Type: text/html"
                print
                print "ERROR|%s" %file_name
 
# We have Message then this is a status update.
else:
        # Redirect back to the form
        print "Status: 302 Moved"
        print "Location: %s" %url
        print
 
        # Read in the url from the file
        f = open(file_name,'r')
        base_url = f.read()
 
        # Build the complete url with query args.
        message = form["Message"].value
        args = "?Message=%s" % urllib.quote(message)
 
        # Make the request, giving the status to the script.
        response = urllib2.urlopen(base_url + args)