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