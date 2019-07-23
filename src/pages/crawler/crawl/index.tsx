import {
  Card,
  Col,
  Descriptions,
  Icon,
  Popover,
  Row,
  Steps,
  Table,
  message,
} from 'antd';
import { GridContent, PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { Component, Fragment } from 'react';

import { Dispatch } from 'redux';
import classNames from 'classnames';
import { connect } from 'dva';
import styles from './style.less';
import { RouteComponentProps } from 'dva/router';
import { StateType } from './model';
import { FormComponentProps } from 'antd/es/form';
import ImportForm from './components/ImportForm';

const { Step } = Steps;

const getWindowWidth = () => window.innerWidth || document.documentElement.clientWidth;

function description(item: any): React.ReactNode {
  return (
    <Descriptions className={styles.headerList} size="small" column={3}>
      <Descriptions.Item label="规则名称">{item.name}</Descriptions.Item>
      <Descriptions.Item label="规则描述">{item.desc}</Descriptions.Item>
      {/* <Descriptions.Item label="规则内容">{item.options}</Descriptions.Item>
      <Descriptions.Item label="创建时间">{item.createdAt.toString()}</Descriptions.Item> */}
    </Descriptions>
  );
}

const currentStatus = {
  0: '规则管理中...',
  1: '爬取中...',
  2: '导入中...',
  3: '完成！'
}

const popoverContent = (
  <div style={{ width: 160 }}>
    <div className={styles.textSecondary} style={{ marginTop: 4 }}>
      耗时：2小时25分钟
    </div>
  </div>
);

const customDot = (
  dot: React.ReactNode,
  {
    status,
  }: {
    status: string;
  },
) => {
  if (status === 'process') {
    return (
      <Popover placement="topLeft" arrowPointAtCenter content={popoverContent}>
        {dot}
      </Popover>
    );
  }
  return dot;
};

interface RouterInfo {
  id: any
}

interface IProps extends RouteComponentProps<RouterInfo>, FormComponentProps{
  loading: boolean;
  crawlerCrawl: StateType;
  dispatch: Dispatch<any>
}

interface IState {
  stepDirection: 'horizontal' | 'vertical';
  currentStep: number;
  importModalVisible: boolean;
  recordValue: [];
}

@connect(
  ({
    crawlerCrawl, // 模型的namespace
    loading,
  }: {
    crawlerCrawl: StateType;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    crawlerCrawl: crawlerCrawl, // 转化之后的state
    loading: loading.effects['crawlerCrawl/fetchRuleById'],
  }),
)
class Crawl extends Component<IProps, IState> {
  public state: {
    stepDirection: 'horizontal' | 'vertical';
    currentStep: number;
    importModalVisible: boolean;
    recordValue: [];
  } = {
    stepDirection: 'horizontal',
    currentStep: 0,
    importModalVisible: false,
    recordValue: [],
  };

  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'crawlerCrawl/fetchRuleById',
      payload: match.params,
    });

    this.setStepDirection();
    window.addEventListener('resize', this.setStepDirection, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setStepDirection);
  }

  setStepDirection = () => {
    const { stepDirection } = this.state;
    const w = getWindowWidth();
    if (stepDirection !== 'vertical' && w <= 576) {
      this.setState({
        stepDirection: 'vertical',
      });
    } else if (stepDirection !== 'horizontal' && w > 576) {
      this.setState({
        stepDirection: 'horizontal',
      });
    }
  };

  // 事件处理
  handleCrawle = () => {
    const { dispatch, crawlerCrawl } = this.props;

    dispatch({
      type: 'crawlerCrawl/crawl',
      payload: {rule: crawlerCrawl.rule},
    });

    this.setState({
      currentStep: 2,
    })
  }

  // 注意：必须使用 name = () => {} 方式定义，否则无法使用 this.props。
  handleImport = (item: any) => {
    const { dispatch, crawlerCrawl } = this.props;

    dispatch({
      type: 'crawlerCrawl/importPost',
      payload: {item: item},
    });

    this.setState({
      currentStep: 3,
    })

    // todo: crawlerCrawl.importMsg 未获得预想的值
    message.success('导入完成！' + crawlerCrawl.importMsg);
  };

  handleImportModalVisible = (flag?: boolean, record?: any) => {
    this.setState({
      importModalVisible: !!flag,
      recordValue: record,
    });
  };
  // End handles

  desc1 = (
    <div className={classNames(styles.textSecondary, styles.stepDescription)}>
      <Fragment>
        <Icon type="eye" style={{ marginLeft: 8 }} />
        <a onClick={this.handleCrawle} >查看</a>

        <Icon type="edit" style={{ marginLeft: 8 }} />
        <a>修改</a>

        <Icon type="file" style={{ marginLeft: 8 }} />
        <a>新建</a>
      </Fragment>
    </div>
  );

  desc2 = (
    <div className={styles.stepDescription}>
      <Fragment>
        <Icon type="bug" style={{ color: '#00A0E9', marginLeft: 8 }} />
        <a onClick={this.handleCrawle} >爬取</a>
      </Fragment>
    </div>
  );

  importDesc = (
    <div className={styles.stepDescription}>
      <Fragment>
        <Icon type="download" style={{ color: '#00A0E9', marginLeft: 8 }} />
        <a onClick={this.handleCrawle} >全部导入</a>
      </Fragment>
      <div>单独导入，请从列表中选择操作</div>
    </div>
  );

  columns = (rule?: any) => {
    // const { crawlerCrawl } = this.props;
    let options: any[] = [];

    if (rule && rule.options.length > 0) {
      let ruleJson = JSON.parse(rule.options); // JSON.parse 的参数必须是json字符串，且不能空

      ruleJson.forEach((item: any, index: any) => {
        if (['startSelect', 'paginate', 'limit', 'item'].includes(item.field)) {
          return;
        }

        if (index === 0) {
          options.push({
            title: item.field,
            dataIndex: item.field,
            key: item.field,
            width: 120,
            fixed: 'left',
          })
        } else {
          options.push({
            title: item.field,
            dataIndex: item.field,
            key: item.field,
            render: (text: string) => {
              if (text && text.length > 200) {
                console.log('====================================');
                console.log(text);
                console.log('====================================');
                return '内容太长，暂时隐藏'
              } else {
                return text;
              }
            },
          })
        }

      });
    }
    options.push(
      {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 100,
        render: (text: string, record: any) => <a href="javascript:;" onClick={e => this.handleImportModalVisible(true, record)} >导入</a>,
      },
    )
    return options;
  }

  render() {
    const { stepDirection, currentStep, importModalVisible, recordValue } = this.state;
    const { crawlerCrawl, loading } = this.props;

  const extra = (
      <Row
        style={{
          minWidth: 400,
        }}
      >
        <Col xs={24} sm={12}>
          <div className={styles.textSecondary}>当前状态：{currentStatus[currentStep]}</div>
        </Col>
      </Row>
    );

    const importMethods = {
      handleImportModalVisible: this.handleImportModalVisible,
      handleImport: this.handleImport,
    };

    return (
      <PageHeaderWrapper
        title={'爬取规则'}
        content={description(crawlerCrawl.rule)}
        extraContent={extra}
        tabActiveKey="detail"
        tabList={[
          {
            key: 'detail',
            tab: '详情',
          },
        ]}
      >
        <div
          style={{
            margin: 24,
            marginTop: 48,
          }}
          className={styles.main}
        >
          <GridContent>
            <Card title="操作流程" style={{ marginBottom: 24 }}>
              <Steps direction={stepDirection} progressDot={customDot} current={currentStep}>
                <Step title="规则" description={this.desc1} />
                <Step title="爬取" description={this.desc2} />
                <Step title="导入" description={this.importDesc} />
                <Step title="完成" />
              </Steps>
            </Card>

            <Card title="爬取结果" style={{ marginBottom: 24 }}>
              <Table
                loading={loading}
                dataSource={crawlerCrawl.data}
                columns={this.columns(crawlerCrawl.rule)}
                scroll={{ x: 1300 }}
              />
            </Card>
          </GridContent>
        </div>

       {importModalVisible && (
          <ImportForm
            {...importMethods}
            importModalVisible={importModalVisible}
            record={recordValue}
          />
        )}
      </PageHeaderWrapper>
    );
  }
}

export default Crawl;
