
const example_1_data = [["Need to work at 9", '2022-03-10'], ["Need to work on personal", "2003-03-11"]]
const example_2_data = [["sleep", '2019-03-10']]
const example_3_data = [["drink", '2000-03-20'], ["eat", '2011-03-20'], ["sweep floor", '2011-06-17']]

window.onload = function(){
    const example_1 = new memo();
    example_1.createMemo('example-1', 0, 'sample memo-0', ['Row', 'Notice', 'Deadline', 'Order Adjust'], example_1_data, 100);

    const example_2 = new memo();
    example_2.createMemo('example-2', 1, 'sample memo-1', ['Row', 'Notice', 'Deadline', 'Order Adjust'], example_1_data, 100);
    example_2.insertdata(example_2_data)
    example_2.deleteRow(1)

    const example_3 = new memo();
    example_3.createMemo('example-3', 2, 'sample memo-2', ['Row', 'Notice', 'Deadline', 'Order Adjust'], example_1_data, 100);
    example_3.setHeaderColor('purple');
    example_3.setRowColor(1,'red');
    example_3.setBackgroundColor('green')

    const example_4 = new memo();
    example_4.createMemo('example-4', 3, 'sample memo-3', ['Row', 'Notice', 'Deadline', 'Order Adjust'], example_1_data, 100);
    example_4.setMaxRow(1)

    const example_5 = new memo();
    example_5.createMemo('example-5', 4, 'sample memo-4', ['Row', 'Notice', 'Deadline', 'Order Adjust'], example_1_data, 100);
    example_5.addCategory('test')

    const example_6 = new memo();
    example_6.createMemo('example-6', 5, 'sample memo-5', ['Row', 'Notice', 'Deadline', 'Order Adjust'], example_1_data, 100);
    example_6.deleteCategory('DEADLINE')

    const example_7 = new memo();
    example_7.createMemo('example-7', 6, 'sample memo-6', ['Row', 'Notice', 'Deadline', 'Order Adjust'], example_1_data, 100);
    example_7.insertdata(example_3_data)
    example_7.deleteRankButton()

    const example_8 = new memo();
    example_8.createMemo('example-8', 7, 'sample memo-7', ['Row', 'Notice', 'Deadline', 'Order Adjust'], example_1_data, 100);
    example_8.insertdata(example_3_data)
    example_8.editNotice(2, 'test')
}