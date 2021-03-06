/**
 * Push badges to backpack.
 */
function addtobackpack(event, args) {
    var badgetable = Y.one('#issued-badge-table');
    var errordiv = Y.one('#addtobackpack-error');
    var errortext = M.util.get_string('error:backpackproblem', 'badges');
    var errorhtml = '<div id="addtobackpack-error" class="box boxaligncenter notifyproblem">' + errortext + '</div>';

    if (typeof OpenBadges !== 'undefined') {
        OpenBadges.issue([args.assertion], function(errors, successes) { });
    } else {
        // Add error div if it doesn't exist yet.
        if (!errordiv) {
            var badgerror = Y.Node.create(errorhtml);
            badgetable.insert(badgerror, 'before');
        }
    }
}

/**
 * Check if website is externally accessible from the backpack.
 */
function check_site_access() {
    var add = Y.one('#check_connection');

    var callback = {
            method: "GET",
            on: {
                success: function(id, o, args) {
                            var data = Y.JSON.parse(o.responseText);
                            if (data.code == 'http-unreachable') {
                                add.setHTML(data.response);
                                add.removeClass('hide');
                            }
                        },
                failure: function(o) { }
            }
        };

    Y.use('io-base', function(Y) {
        Y.io('ajax.php', callback);
    });

    return false;
}