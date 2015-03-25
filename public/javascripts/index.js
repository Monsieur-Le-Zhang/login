/**
 * Created by Le on 3/24/2015.
 */
$(function () {
    $('#logout').click(function (e) {
        //e.preventDefault();
        if (confirm('Are you sure you want to log out?')) {
            $.ajax({
                url: '/login',
                method: 'delete',
                success: function (datas) {
                    console.log('success');
                }
            })
        }
    });
})