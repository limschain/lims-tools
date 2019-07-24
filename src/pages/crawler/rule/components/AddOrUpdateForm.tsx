import { Button, DatePicker, Form, Input, Modal, Select, Steps } from 'antd';
import React, { Component } from 'react';

import { FormComponentProps } from 'antd/es/form';
import { TableListItem } from '../data';
import TableForm from './TableForm';

export interface FormValsType extends Partial<TableListItem> {
  // frequency?: string;
}

export interface AddOrUpdateFormProps extends FormComponentProps {
  handleAddOrUpdateModalVisible: (flag?: boolean, formVals?: FormValsType) => void;
  handleAddOrUpdate: (values: FormValsType) => void;
  addOrupdateModalVisible: boolean;
  values: Partial<TableListItem>; // FormValsType; //
}
const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;

export interface AddOrUpdateFormState {
  formVals: FormValsType;
  currentStep: number;
}

class AddOrUpdateForm extends Component<AddOrUpdateFormProps, AddOrUpdateFormState> {
  static defaultProps = {
    handleAddOrUpdate: () => {},
    handleAddOrUpdateModalVisible: () => {},
    values: {},
  };

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  constructor(props: AddOrUpdateFormProps) {
    super(props);

    this.state = {
      formVals: props.values,
      currentStep: 0,
    };
  }

  handleNext = (currentStep: number) => {
    const { form, handleAddOrUpdate } = this.props;
    const { formVals: oldValue } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const formVals = { ...oldValue, ...fieldsValue };
      if (typeof formVals.options === 'string') {
        formVals.options = JSON.parse(formVals.options);
      }
      this.setState(
        {
          formVals,
        },
        () => {
          if (currentStep < 2) {
            this.forward();
          } else {
            handleAddOrUpdate(formVals);
          }
        },
      );
    });
  };

  backward = () => {
    const { currentStep } = this.state;
    this.setState({
      currentStep: currentStep - 1,
    });
  };

  forward = () => {
    const { currentStep } = this.state;
    this.setState({
      currentStep: currentStep + 1,
    });
  };


  renderContent = (currentStep: number, formVals: FormValsType) => {
    const {
      form,
    } = this.props;

    if (currentStep === 1) {
      return [
        <FormItem key="options" label="">
          {form.getFieldDecorator('options', {
            initialValue: formVals.options,
          })(<TableForm />)}
        </FormItem>
      ];
    }
    if (currentStep === 2) {
      return [
        <FormItem key="time" {...this.formLayout} label="开始时间">
          {form.getFieldDecorator('time', {
            rules: [{ required: true, message: '请选择开始时间！' }],
          })(
            <DatePicker
              style={{ width: '100%' }}
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="选择开始时间"
            />,
          )}
        </FormItem>,
        <FormItem key="frequency" {...this.formLayout} label="调度周期">
          {form.getFieldDecorator('frequency', {
            initialValue: formVals.frequency,
          })(
            <Select style={{ width: '100%' }}>
              <Option value="day">日</Option>
              <Option value="month">月</Option>
              <Option value="week">周</Option>
            </Select>,
          )}
        </FormItem>,
      ];
    }
    return [
      <FormItem key="name" {...this.formLayout} label="规则名称">
        {form.getFieldDecorator('name', {
          rules: [{ required: true, message: '请输入规则名称！' }],
          initialValue: formVals.name,
        })(<Input placeholder="请输入" />)}
      </FormItem>,
      <FormItem key="desc" {...this.formLayout} label="规则描述">
        {form.getFieldDecorator('desc', {
          rules: [{ required: true, message: '请输入至少3个字符的规则描述！', min: 3 }],
          initialValue: formVals.desc,
        })(<TextArea rows={4} placeholder="请输入至少3个字符" />)}
      </FormItem>,
      <FormItem key="url" {...this.formLayout} label="爬取网址">
      {form.getFieldDecorator('url', {
        rules: [{ required: true, message: '请输入要爬取的网站地址！' }],
        initialValue: formVals.url,
      })(<Input placeholder="请输入" />)}
    </FormItem>,
    ];
  };

  renderFooter = (currentStep: number) => {
    const { handleAddOrUpdateModalVisible, values } = this.props;
    if (currentStep === 1) {
      return [
        <Button key="back" style={{ float: 'left' }} onClick={this.backward}>
          上一步
        </Button>,
        <Button key="cancel" onClick={() => handleAddOrUpdateModalVisible(false, values)}>
          取消
        </Button>,
        <Button key="forward" type="primary" onClick={() => this.handleNext(currentStep)}>
          下一步
        </Button>,
      ];
    }
    if (currentStep === 2) {
      return [
        <Button key="back" style={{ float: 'left' }} onClick={this.backward}>
          上一步
        </Button>,
        <Button key="cancel" onClick={() => handleAddOrUpdateModalVisible(false, values)}>
          取消
        </Button>,
        <Button key="submit" type="primary" onClick={() => this.handleNext(currentStep)}>
          完成
        </Button>,
      ];
    }
    return [
      <Button key="cancel" onClick={() => handleAddOrUpdateModalVisible(false, values)}>
        取消
      </Button>,
      <Button key="forward" type="primary" onClick={() => this.handleNext(currentStep)}>
        下一步
      </Button>,
    ];
  };

  render() {
    const { addOrupdateModalVisible, handleAddOrUpdateModalVisible, values } = this.props;
    const { currentStep, formVals } = this.state;

    return (
      <Modal
        width={640}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="规则配置"
        visible={addOrupdateModalVisible}
        footer={this.renderFooter(currentStep)}
        onCancel={() => handleAddOrUpdateModalVisible(false, values)}
        afterClose={() => handleAddOrUpdateModalVisible()}
      >
        <Steps style={{ marginBottom: 28 }} size="small" current={currentStep}>
          <Step title="基本信息" />
          <Step title="规则属性" />
          <Step title="设定周期" />
        </Steps>
        {this.renderContent(currentStep, formVals)}
      </Modal>
    );
  }
}

export default Form.create<AddOrUpdateFormProps>()(AddOrUpdateForm);
