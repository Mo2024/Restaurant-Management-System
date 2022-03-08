let disposition = $('#item-options').val();
$('#section-options').change(function () {
    disposition = $(this).val();
    changeList(disposition)

})
function changeList() {
    let menu = JSON.parse(document.getElementById('yy').innerHTML)
    let html = ['<option selected hidden>Item</option>']

    if (disposition !== null) {
        for (let j = 0; j < menu[disposition].items.length; j++) {
            html.push(`<option value="${menu[disposition].items[j]._id}">${menu[disposition].items[j].name}</option>`)
        }
        html = html.join('\n')
    }

    document.getElementById('item-options').innerHTML = html;
}
changeList(disposition)