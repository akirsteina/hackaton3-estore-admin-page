// initialize dataTables plugin
$(document).ready(function() {
    $('.sorted-table').DataTable();
});

$('#categories-table').dataTable({
    "sDom": 't f',
    "language": {
        "search": "Search categories: "
    },
    "columns": [
        null,
        null,
        null,
        { "orderable": false }
    ]
});

// hide create category element if visible
const hideCreateTableElement = () => {
    if ($("#create-table-element-field").not('.hidden')) {
        $("#create-table-element-field").addClass("hidden");
    }
}

// remove table element
$('.remove-button').on('click', function() {
    $(this).parentsUntil('tbody').remove();
    let tableElementCount = 0;
    $('tbody > tr').each(() => {
        tableElementCount += 1;
    });
    hideCreateCategory();
    // add a message in there are table elements
    if (tableElementCount === 0) {
        $("#empty-table-message").removeClass("hidden");
    }
});

// toggle create table element field
$('.toggle-create-table-element-btn').on('click', function() {
    $("#create-table-element-field").toggleClass("hidden");
    // kkāda validācij
    $("#empty-table-message").toggleClass("hidden");
});