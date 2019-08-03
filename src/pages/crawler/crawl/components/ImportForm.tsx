import React, { PureComponent } from 'react';

import { Modal, Form, Select, Input } from 'antd';
import styles from './style.less';
import { FormComponentProps } from 'antd/es/form';
import Table from 'antd/es/table';
import { invertKeyValues } from '@/utils/utils';
const Option = Select.Option;
const { TextArea } = Input;

// fixme: 这里不会写死，以后放在数据库里，面向不同的导入对象，用户可以任意设置
const targetFieldValues = ['title', 'date', 'summary', 'desc', 'content',
'mobiContent', 'author', 'source', 'keyword', 'browserTitle',
'flag', 'link', 'pictureId', 'headPictureId', 'views', 'groupIds',]

interface ImportFormProps extends FormComponentProps {
  handleImportModalVisible: (flag?: boolean | undefined, record?: any) => void;
  handleImport: (item: any) => void;
  loading?: boolean;
  record?: any;
  importModalVisible: boolean;
}

interface ImportFormState {
  loading?: boolean;
}

class ImportForm extends PureComponent<ImportFormProps, ImportFormState> {
  constructor(props: ImportFormProps) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  // 爬取的字段 - 目标字段，记录对应关系，方便形成导入策略
  crawlFieldsToTargetFields = {};
  importItemRevert = {};

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  handleSubmit = () => {
    const { handleImport, handleImportModalVisible} = this.props;
    const importItem = invertKeyValues(this.importItemRevert);

    handleImport(importItem);
    // Close
    handleImportModalVisible();
  };

  // todo：这个两个数据要记得归零，所以放在状态里比较好
  handleSelect = (value: any, record: any) => {
    this.crawlFieldsToTargetFields[record.name] = value;
    this.importItemRevert[record.value] = value;
  }

  columns: any[] = [
    {
      title: '抓取字段名',
      dataIndex: 'name',
      width: 20,
    },
    {
      title: '抓取字段值',
      dataIndex: 'value',
      width: 280,
      render: (text: string) => {
        if (text && text.length > 200) {
          return (<TextArea rows={10} placeholder="请输入至少3个字符" value={text}/>)
        } else {
          return (<Input placeholder="请输入" value={text}/>);
        }
      },
    },
    {
      title: '导入字段名',
      width: 100,
      render: (record: any) => {
        let defaultValue;
        if (targetFieldValues.includes(record.name)) {
          defaultValue = record.name;
        }

        return (<Select size='small' defaultValue={defaultValue} placeholder="请选择" style={{ width: '100%' }} onChange={(value) => this.handleSelect(value, record)}>
          {targetFieldValues.map(field => (
            <Option key={field}>{field}</Option>
          ))}
        </Select>
      )},
    },
  ]
  render() {
    const { importModalVisible, handleImportModalVisible, record } = this.props;

    const modalFooter = { okText: '导入', onOk: this.handleSubmit, onCancel: () => handleImportModalVisible(false, record) };

    let data: any[] = this.getDataSource(record);

    return (
      <Modal
        title={`文章导入`}
        className={styles.standardListForm}
        width={640}
        bodyStyle={{ padding: '28px 0 0' }}
        destroyOnClose
        visible={importModalVisible}
        {...modalFooter}
      >
        <Table
          columns={this.columns}
          dataSource={data}
          pagination={false}
        />
      </Modal>
    );
  }

  // record是爬取的数据对象，这里将其整理成表格需要的数据
  private getDataSource(record: any) {
    let data: any[] = [];
    const fields = Object.keys(record);
    fields.forEach((k: any, i: any) => {
      data.push({
        key: i,
        name: k,
        value: record[k],
      });
    });
    return data;
  }

}

export default Form.create<ImportFormProps>()(ImportForm);
