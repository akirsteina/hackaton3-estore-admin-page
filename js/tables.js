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

const toggleEmptyTableMessage = () => {
    let tableElementCount = 0;
    $('tbody > tr').each(() => {
        tableElementCount += 1;
    });
    if (tableElementCount === 0) {
        $("#empty-table-message").removeClass("hidden");
    }
};

// remove table element
$('.remove-button').on('click', function() {
    $(this).parentsUntil('tbody').remove();
    hideCreateTableElement();
    toggleEmptyTableMessage();
});

// toggle create table element field
$('.toggle-create-table-element-btn').on('click', function() {
    $("#create-table-element-field").toggleClass("hidden");
    if ($('#create-table-element-field').not('.hidden')) {
        $("#empty-table-message").addClass("hidden");
    } else {
        toggleEmptyTableMessage();
    }

});

const validateInput = (id, title, description) => {
    if (id === '' && title === '' && description === '') {
        return;
    } else if (id === '') {
        alert('Please enter category ID!');
        return;
    } else if (title === '') {
        alert('Please enter category title!');
        return;
    } else if (description === '') {
        alert('Please enter category description!');
        return;
    }
    return true;
};

// create category element
$('#create-category-form').submit(function(event) {
    event.preventDefault();
    const categoryID = $('#category-id').val();
    const categoryTitle = $('#category-title').val();
    const categoryDescription = $('#category-description').val();
    // validation for empty fields
    while (!validateInput(categoryID, categoryTitle, categoryDescription)) {
        return;
    };

    // add new table element
    const newCategory = `
    <tr>
        <th scope="col">${categoryID}</th>
        <td>${categoryTitle}</td>
        <td>${categoryDescription}</td>
        <td>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button type="button" class="btn btn-dark edit-category-btn">Edit</button>
                <button type="button" class="btn btn-primary remove-button">Remove</button>
            </div>
        </td>
    </tr>`
    $('tbody').prepend(newCategory);
    // reset values
    $('#category-id').val('');
    $('#category-title').val('');
    $('#category-description').val('');
    $('#create-table-element-field').toggleClass('hidden');
});

// toggle edit category field
$('.edit-category-btn').on('click', function() {
    hideCreateTableElement();
    $('#edit-table-element-field').removeClass('hidden');
    $('#edit-category-id').val($(this).parentsUntil('tbody').find('.category-id-value').html());
    $('#edit-category-title').val($(this).parentsUntil('tbody').find('.category-title-value').html());
    $('#edit-category-description').val($(this).parentsUntil('tbody').find('.category-description-value').html());
    // edit category
    let categoryID = '';
    let categoryTitle = '';
    let categoryDescription = '';
    $('#edit-category-form').submit(function(event) {
        event.preventDefault();
        categoryID = $('#edit-category-id').val();
        categoryTitle = $('#edit-category-title').val();
        categoryDescription = $('#edit-category-description').val();
        while (!validateInput(categoryID, categoryTitle, categoryDescription)) {
            return;
        };
        $(this).parentsUntil('tr').find('.category-id-value').html(categoryID);
        $(this).parentsUntil('tr').find('.category-title-value').html(categoryTitle);
        $(this).parentsUntil('tr').find('.category-description-value').html(categoryDescription);
    });
})