let util = {

};
util.title = function (title) {
    title = title ? title + ' - Home' : 'TaskCenter-Admin';
    window.document.title = title;
};

export default util;