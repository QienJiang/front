import { Table, Input, Button, Popconfirm, Form } from "antd";
import React, { Component } from "react";
import axios from "axios";
import "./Manager.css";

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  state = {
    editing: false
  };

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  save = e => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  renderCell = form => {
    this.form = form;
    const { children, dataIndex, record, title } = this.props;
    const { editing } = this.state;
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title} is required.`
            }
          ],
          initialValue: record[dataIndex]
        })(
          <Input
            ref={node => (this.input = node)}
            onPressEnter={this.save}
            onBlur={this.save}
          />
        )}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={this.toggleEdit}
      >
        {children}
      </div>
    );
  };

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    );
  }
}

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "LoadId",
        dataIndex: "loanid",
        width: "10%"
      },
      {
        title: "Name",
        dataIndex: "name",
        width: "10%"
      },
      {
        title: "SSN",
        dataIndex: "ssnumber",
        width: "10%"
      },
      {
        title: "RequestAmount",
        dataIndex: "ramounnt",
        width: "10%"
      },
      {
        title: "Approveamount",
        dataIndex: "aamount",
        width: "10%",
        editable: true
      },
      {
        title: "Term",
        dataIndex: "loanterm",
        width: "10%",
        editable: true
      },
      {
        title: "Status",
        dataIndex: "loanstatus",
        width: "10%",
        editable: true
      }
    ];

    this.state = {
      dataSource: [],
      count: 0
    };
  }

  handleSave = row => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row
    });
    this.setState({ dataSource: newData });

    console.log("row", row);
    const {
      loanid,
      name,
      ramounnt,
      ssnumber,
      aamount,
      loanterm,
      loanstatus
    } = row;

    let data = JSON.stringify({
      loanid: loanid,
      name: name,
      ramounnt: ramounnt,
      ssnumber: ssnumber,
      aamount: aamount,
      loanterm: loanterm,
      loanstatus: loanstatus
    });

    console.log("data", data);
    axios
      .post("http://localhost:8080/loan/updateloan", data, {
        headers: { "Content-Type": "application/json;charset=UTF-8" }
      })
      .then(result => {
        console.log(result.data);
        this.reload();
      })
      .catch(error => {
        console.log(error);
        console.log("fail");
        this.reload();
      });
    this.reload();
  };

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell
      }
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave
        })
      };
    });
    return (
      <div>
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    );
  }
  componentDidMount() {
    this.reload();
  }
  reload() {
    axios
      .post("http://localhost:8080/loan/allLoan")
      .then(res => {
        let temp = res.data;
        for (let i = 0; i < temp.length; i++) {
          temp[i].key = i;
        }

        this.setState({
          dataSource: temp
        });
        let length = this.state.dataSource.length;
        this.setState({
          count: length
        });
      })

      .catch(error => {
        console.log(error);
      });
  }
}
export default EditableTable;
