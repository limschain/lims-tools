import { Button, Divider, Input, Popconfirm, Table, message, Select } from 'antd';
import React, { Fragment, PureComponent } from 'react';

import { isEqual } from 'lodash';
import styles from '../style.less';
const { Option } = Select;

interface TableFormDateType {
  key: number;
  field?: string;
  selector?: string;
  filter?: string;
  isNew?: boolean;
  editing?: boolean;
}
interface TableFormProps {
  loading?: boolean;
  value?: TableFormDateType[];
  onChange?: (value: TableFormDateType[]) => void;
}

interface TableFormState {
  loading?: boolean;
  value?: TableFormDateType[];
  data?: TableFormDateType[];
}
class TableForm extends PureComponent<TableFormProps, TableFormState> {
  constructor(props: TableFormProps) {
    super(props);

    this.state = {
      data: props.value,
      loading: false,
      value: props.value,
    };
  }

  static getDerivedStateFromProps(nextProps: TableFormProps, preState: TableFormState) {
    if (isEqual(nextProps.value, preState.value)) {
      return null;
    }
    return {
      data: nextProps.value,
      value: nextProps.value,
    };
  }

  clickedCancel: boolean = false;

  cacheOriginData = {};

  columns = [
    {
      title: '字段名',
      dataIndex: 'field',
      key: 'field',
      width: '20%',
      render: (text: string, record: TableFormDateType) => {
        if (record.editing) {
          return (
            <Input
              value={text}
              autoFocus
              onChange={e => this.handleFieldChange(e, 'field', record.key)}
              onKeyPress={e => this.handleKeyPress(e, record.key)}
              placeholder="字段名"
            />
          );
        }
        return text;
      },
    },
    {
      title: '标签',
      dataIndex: 'selector',
      key: 'selector',
      width: '30%',
      render: (text: string, record: TableFormDateType) => {
        if (record.editing) {
          return (
            <Input
              value={text}
              onChange={e => this.handleFieldChange(e, 'selector', record.key)}
              onKeyPress={e => this.handleKeyPress(e, record.key)}
              placeholder="标签"
            />
          );
        }
        return text;
      },
    },
    {
      title: '过滤器',
      dataIndex: 'filter',
      key: 'filter',
      width: '20%',
      render: (text: string, record: TableFormDateType) => {
        if (record.editing) {
          return (
            <Select
            placeholder="过滤器"
            defaultValue={text}
            onChange={e => this.handleFieldChange(e, 'filter', record.key)}
            style={{ width: '100%' }}>
              <Option value="email">E-mail</Option>
              <Option value="telephone">电话号码</Option>
            </Select>
          );
        }
        return text;
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (text: string, record: TableFormDateType) => {
        const { loading } = this.state;
        if (!!record.editing && loading) {
          return null;
        }
        if (!!record.editing) {
          if (record.isNew) {
            return (
              <span>
                <a onClick={e => this.saveRow(e, record.key)}>保存</a>
                <Divider type="vertical" />
                <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.key)}>
                  <a>删除</a>
                </Popconfirm>
              </span>
            );
          }
          return (
            <span>
              <a onClick={e => this.saveRow(e, record.key)}>保存</a>
              <Divider type="vertical" />
              <a onClick={e => this.cancel(e, record.key)}>取消</a>
            </span>
          );
        }
        return (
          <span>
            <a onClick={e => this.toggleEditing(e, record.key)}>编辑</a>
            <Divider type="vertical" />
            <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.key)}>
              <a>删除</a>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  getRowByKey(key: number, newData?: TableFormDateType[]) {
    const { data = [] } = this.state;
    return (newData || data).filter(item => item.key === key)[0];
  }

  toggleEditing = (e: React.MouseEvent | React.KeyboardEvent, key: number) => {
    e.preventDefault();
    const { data = [] } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);

    if (target) {
      // 进入编辑状态时保存原始数据
      if (!target.editing) {
        this.cacheOriginData[key] = { ...target };
      }
      target.editing = !target.editing;
      this.setState({ data: newData });
    }
  };

  newMember = () => {
    const { data = [] } = this.state;
    const newData = data.map(item => ({ ...item }));

    newData.push({
      key: newData.length, // key is index from 0
      field: '',
      selector: '',
      filter: '',
      editing: true, // 辅助字段
      isNew: true,
    });
    this.setState({ data: newData });
  };

  keyRefresh(data: any[]) {
    return data.map((v, i) => {
      v.key = i;
      return v;
    });
  }

  remove(key: number) {
    const { data = [] } = this.state;
    const { onChange } = this.props;
    const newData = data.filter(item => item.key !== key);
    this.keyRefresh(newData);
    this.setState({ data: newData });
    if (onChange) {
      onChange(newData);
    }
  }

  handleKeyPress(e: React.KeyboardEvent, key: number) {
    if (e.key === 'Enter') {
      this.saveRow(e, key);
    }
  }

  handleFieldChange(e: any, fieldName: string, key: number) {
    const value = !!e.target ? e.target.value : e;
    const { data = [] } = this.state;
    const newData = [...data];
    const target = this.getRowByKey(key, newData);
    if (target) {
      target[fieldName] = value;
      this.setState({ data: newData });
    }
  }

  saveRow(e: React.MouseEvent | React.KeyboardEvent, key: number) {
    e.persist();
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      if (this.clickedCancel) {
        this.clickedCancel = false;
        return;
      }
      const target = this.getRowByKey(key) || {};
      if (!target.field || !target.selector) {
        message.error('请填写完整信息。');
        (e.target as HTMLInputElement).focus();
        this.setState({
          loading: false,
        });
        return;
      }
      delete target.isNew;
      this.toggleEditing(e, key);
      const { data = [] } = this.state;
      const { onChange } = this.props;
      if (onChange) {
        onChange(data);
      }
      this.setState({
        loading: false,
      });
    }, 500);
  }

  cancel(e: React.MouseEvent, key: number) {
    this.clickedCancel = true;
    e.preventDefault();
    const { data = [] } = this.state;
    const oldData = [...data];

    const newData = oldData.map(item => {
      if (item.key === key) {
        if (this.cacheOriginData[key]) {
          let value = {
            ...item,
            ...this.cacheOriginData[key], // 恢复到原始状态
            editing: false, // 改变编辑状态
          };

          delete this.cacheOriginData[key]; // 删除原始值

          return value;
        }
      } else {
        return item;
      }
    });

    this.setState({ data: newData });
    this.clickedCancel = false;
  }

  render() {
    const { loading, data } = this.state;

    return (
      <Fragment>
        <Table<TableFormDateType>
          loading={loading}
          columns={this.columns}
          dataSource={data}
          pagination={false}
          rowClassName={record => (record.editing ? styles.editing : '')}
        />
        <Button
          style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
          type="dashed"
          onClick={this.newMember}
          icon="plus"
        >
          新增字段
        </Button>
      </Fragment>
    );
  }
}

export default TableForm;
