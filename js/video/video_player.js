function addPlayer(divID,videoFile,imageFile,w,h)
{
    divID=divID || 'Player';
    var newS1 = new SWFObject("/js/video/player.swf","ply",w,h+20,"9","#999999");
    //$('#'+divID).html("<div class=\"Loading\" style=\"text-align: center;\"><img src=\"" + loadingImage.src + "\"><p style=\"text-align: center; font-weight: 700;\">Loading ...</p></div>");
    newS1.addParam("flashvars",'file='+videoFile + "&image=" + imageFile);
    newS1.addParam("wmode", "transparent");
    newS1.write(divID);
    return false;
}