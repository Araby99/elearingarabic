; jQuery.preloadCssImages = function (settings) {
    settings = jQuery.extend({
        statusTextEl: null,
        statusBarEl: null,
        errorDelay: 999,
        simultaneousCacheLoading: 2
    }, settings);
    var allImgs = [], loaded = 0, imgUrls = [], thisSheetRules, errorTimer;
    function onImgComplete() {
        clearTimeout(errorTimer);
        if (imgUrls && imgUrls.length && imgUrls[loaded]) {
            loaded++;
            if (settings.statusTextEl) {
                var nowloading = (imgUrls[loaded]) ? 'Now Loading: <span>' + imgUrls[loaded].split('/')[imgUrls[loaded].split('/').length - 1] : 'Loading complete';
                jQuery(settings.statusTextEl).html('<span class="numLoaded">' + loaded + '</span> of <span class="numTotal">' + imgUrls.length + '</span> loaded (<span class="percentLoaded">' + (loaded / imgUrls.length * 100).toFixed(0) + '%</span>) <span class="currentImg">' + nowloading + '</span></span>');
            }
            if (settings.statusBarEl) {
                var barWidth = jQuery(settings.statusBarEl).width();
                jQuery(settings.statusBarEl).css('background-position', -(barWidth - (barWidth * loaded / imgUrls.length).toFixed(0)) + 'px 50%');
            }
            loadImgs();
        }
    }
    function loadImgs() {
        if (imgUrls && imgUrls.length && imgUrls[loaded]) {
            var img = new Image();
            img.src = imgUrls[loaded];
            if (!img.complete) {
                jQuery(img).bind('error load onreadystatechange', onImgComplete);
            } else {
                onImgComplete();
            }
            errorTimer = setTimeout(onImgComplete, settings.errorDelay);
        }
    }
    function parseCSS(sheets, urls) {
        var w3cImport = false, imported = [], importedSrc = [], baseURL;
        var sheetIndex = sheets.length;
        while (sheetIndex--) {
            var cssPile = '';
            if (urls && urls[sheetIndex]) {
                baseURL = urls[sheetIndex];
            } else {
                var csshref = (sheets[sheetIndex].href) ? sheets[sheetIndex].href : 'window.location.href';
                var baseURLarr = csshref.split('/');
                baseURLarr.pop();
                baseURL = baseURLarr.join('/');
                if (baseURL) {
                    baseURL += '/';
                }
            }
            if (sheets[sheetIndex].cssRules || sheets[sheetIndex].rules) {
                thisSheetRules = (sheets[sheetIndex].cssRules) ? sheets[sheetIndex].cssRules : sheets[sheetIndex].rules;
                var ruleIndex = thisSheetRules.length;
                while (ruleIndex--) {
                    if (thisSheetRules[ruleIndex].style && thisSheetRules[ruleIndex].style.cssText) {
                        var text = thisSheetRules[ruleIndex].style.cssText;
                        if (text.toLowerCase().indexOf('url') != -1) {
                            cssPile += text;
                        }
                    } else if (thisSheetRules[ruleIndex].styleSheet) {
                        imported.push(thisSheetRules[ruleIndex].styleSheet);
                        w3cImport = true;
                    }
                }
            }
            var tmpImage = cssPile.match(/[^\("]+\.(gif|jpg|jpeg|png)/g);
            if (tmpImage) {
                var i = tmpImage.length;
                while (i--) {
                    var imgSrc = (tmpImage[i].charAt(0) == '/' || tmpImage[i].match('://')) ? tmpImage[i] : baseURL + tmpImage[i];
                    if (jQuery.inArray(imgSrc, imgUrls) == -1) {
                        imgUrls.push(imgSrc);
                    }
                }
            }
            if (!w3cImport && sheets[sheetIndex].imports && sheets[sheetIndex].imports.length) {
                for (var iImport = 0, importLen = sheets[sheetIndex].imports.length; iImport < importLen; iImport++) {
                    var iHref = sheets[sheetIndex].imports[iImport].href;
                    iHref = iHref.split('/');
                    iHref.pop();
                    iHref = iHref.join('/');
                    if (iHref) {
                        iHref += '/';
                    }
                    var iSrc = (iHref.charAt(0) == '/' || iHref.match('://')) ? iHref : baseURL + iHref;
                    importedSrc.push(iSrc);
                    imported.push(sheets[sheetIndex].imports[iImport]);
                }
            }
        }
        if (imported.length) {
            parseCSS(imported, importedSrc);
            return false;
        }
        var downloads = settings.simultaneousCacheLoading;
        while (downloads--) {
            setTimeout(loadImgs, downloads);
        }
    }
    parseCSS(document.styleSheets);
    return imgUrls;
}
    ;
