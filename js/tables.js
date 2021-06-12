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
const hideCreateCategory = () => {
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

// create category element
$('#create-category-form').submit(function(event) {
    event.preventDefault();
    const categoryID = $('#category-id').val();
    const categoryTitle = $('#category-title').val();
    const categoryDescription = $('#category-description').val();
    // validation for empty fields
    if (categoryID === '' && categoryTitle === '' && categoryDescription === '') {
        return;
    } else if (categoryID === '') {
        alert('Please enter category ID!');
        return;
    } else if (categoryTitle === '') {
        alert('Please enter category title!');
        return;
    } else if (categoryDescription === '') {
        alert('Please enter category description!');
    }
    // add new table element
    const newCategory = `
    <tr>
        <th scope="col">${categoryID}</th>
        <td>${categoryTitle}</td>
        <td>${categoryDescription}</td>
        <td>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button type="button" class="btn btn-dark edit-category-btn">Edit</button>
                <button type="button" class="btn btn-danger remove-button">Remove</button>
            </div>
        </td>
    </tr>`
    $('tbody').prepend(newCategory);
    // reset values
    $('#category-id').val('');
    $('#category-title').val('');
    $('#category-description').val('');
    $("#create-table-element-field").toggleClass("hidden");
});

// toggle edit category field
$('.edit-category-btn').on('click', function() {
    hideCreateCategory();

})

// edit category